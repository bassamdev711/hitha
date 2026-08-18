'use server'

import { cookies, headers } from 'next/headers'
import { SignJWT } from 'jose'
import prisma from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/hash'
import { validateAdminPassword } from '@/lib/password-policy'
import { checkRateLimit } from '@/lib/rate-limit'
import { ADMIN_COOKIE_NAME, ADMIN_JWT_CONFIG, getAdminJwtSecret } from '@/lib/auth'

const LOGIN_DELAY_MS = 750

async function delay() {
  await new Promise((resolve) => setTimeout(resolve, LOGIN_DELAY_MS))
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export async function login(email: string, password: string) {
  const candidateEmail = typeof email === 'string' ? normalizeEmail(email) : ''
  const candidatePassword = typeof password === 'string' ? password : ''
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!checkRateLimit(`login_${ip}`, 5, 15 * 60 * 1000)) {
    await delay()
    return { success: false, error: 'تم تجاوز الحد المسموح به لمحاولات تسجيل الدخول. يرجى الانتظار 15 دقيقة والمحاولة مجدداً.' }
  }

  if (!candidateEmail || !candidatePassword) {
    await delay()
    return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' }
  }

  let secret: Uint8Array
  try {
    secret = getAdminJwtSecret()
  } catch (error) {
    console.error('Admin login configuration error:', error)
    return { success: false, error: 'تسجيل الدخول غير متاح حالياً' }
  }

  const configuredEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : ''
  const configuredPassword = process.env.ADMIN_PASSWORD
  let isPasswordValid = false

  try {
    const adminProfile = await prisma.adminProfile.findUnique({
      where: { id: 'singleton' },
      select: { email: true, isSetupComplete: true, passwordHash: true },
    })

    if (adminProfile?.isSetupComplete && adminProfile.passwordHash) {
      const profileEmail = adminProfile.email ? normalizeEmail(adminProfile.email) : configuredEmail
      const emailMatches = Boolean(profileEmail) && candidateEmail === profileEmail
      isPasswordValid = emailMatches && verifyPassword(candidatePassword, adminProfile.passwordHash)

      // Backfill the email for an older password-only setup when ADMIN_EMAIL is configured.
      if (isPasswordValid && !adminProfile.email && configuredEmail) {
        await prisma.adminProfile.update({
          where: { id: 'singleton' },
          data: { email: candidateEmail },
        })
      }
    } else if (process.env.ADMIN_SETUP_ENABLED === 'true' && configuredEmail && configuredPassword) {
      const policyError = validateAdminPassword(configuredPassword)
      if (policyError) {
        return { success: false, error: `تهيئة الإدارة غير مكتملة: ${policyError}` }
      }

      if (candidateEmail === configuredEmail && candidatePassword === configuredPassword) {
        await prisma.adminProfile.upsert({
          where: { id: 'singleton' },
          update: {
            email: candidateEmail,
            passwordHash: hashPassword(candidatePassword),
            isSetupComplete: true,
          },
          create: {
            id: 'singleton',
            email: candidateEmail,
            passwordHash: hashPassword(candidatePassword),
            isSetupComplete: true,
          },
        })
        isPasswordValid = true
      }
    }
  } catch (error) {
    console.error('Admin profile lookup failed:', error)
    await delay()
    return { success: false, error: 'تعذر التحقق من تسجيل الدخول حالياً' }
  }

  if (!isPasswordValid) {
    await delay()
    return { success: false, error: 'بيانات الدخول غير صحيحة' }
  }

  try {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setSubject('admin')
      .setIssuer(ADMIN_JWT_CONFIG.issuer)
      .setAudience(ADMIN_JWT_CONFIG.audience)
      .setIssuedAt()
      .setJti(crypto.randomUUID())
      .setExpirationTime('8h')
      .sign(secret)

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    })

    return { success: true }
  } catch (error) {
    console.error('Admin session creation failed:', error)
    return { success: false, error: 'تعذر إنشاء جلسة الإدارة حالياً' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
