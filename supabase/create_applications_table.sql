-- Create applications table for storing student applications
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  date_of_birth date,
  age integer,
  gender text,
  program text,
  sponsor text,
  sponsor_name text,
  previous_institution text,
  gpa text,
  statement text,
  emergency_contact_name text,
  emergency_contact_phone text,
  passport_url text,
  national_id_url text,
  voters_id_url text,
  transcript_url text,
  pdf_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications (email);
CREATE INDEX IF NOT EXISTS idx_applications_sponsor ON public.applications (sponsor);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON public.applications (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_program ON public.applications (program);
