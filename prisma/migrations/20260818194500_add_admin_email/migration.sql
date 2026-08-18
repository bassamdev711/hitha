-- Add the admin email used by the email + password login flow.
ALTER TABLE "AdminProfile" ADD COLUMN "email" TEXT;

-- Keep the optional email unique while allowing existing rows with NULL.
CREATE UNIQUE INDEX "AdminProfile_email_key" ON "AdminProfile"("email");
