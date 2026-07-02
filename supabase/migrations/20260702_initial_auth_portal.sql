-- NutriClinic Pro — Auth, profiles, patient portal data
-- Run in Supabase SQL Editor or via CLI migration

-- Roles enum
CREATE TYPE public.app_role AS ENUM (
  'super_admin', 'admin', 'director', 'nutritionist',
  'assistant', 'receptionist', 'patient'
);

-- Profiles linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  role public.app_role NOT NULL DEFAULT 'nutritionist',
  job_title TEXT,
  company_id UUID,
  branch_id UUID,
  phone TEXT,
  avatar_url TEXT,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  portal_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX profiles_role_idx ON public.profiles(role);
CREATE INDEX profiles_is_demo_idx ON public.profiles(is_demo);

-- Clinical patients (may link to auth user when portal enabled)
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  document_id TEXT,
  birth_date DATE,
  gender TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  nutritionist_id UUID REFERENCES public.profiles(id),
  branch_id UUID,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  portal_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX patients_user_id_idx ON public.patients(user_id);
CREATE INDEX patients_is_demo_idx ON public.patients(is_demo);

-- Patient self-tracking
CREATE TABLE public.patient_weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  weight_kg NUMERIC(5,2) NOT NULL,
  notes TEXT,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_demo BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE public.patient_water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  ml INTEGER NOT NULL,
  target_ml INTEGER NOT NULL DEFAULT 2000,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(patient_id, log_date)
);

CREATE TABLE public.patient_progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  caption TEXT,
  taken_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_demo BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE public.patient_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id),
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  channel TEXT NOT NULL DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'whatsapp')),
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  email_sent_at TIMESTAMPTZ,
  whatsapp_sent_at TIMESTAMPTZ,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.patient_meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  calories_target INTEGER,
  assigned_by UUID REFERENCES public.profiles(id),
  active BOOLEAN NOT NULL DEFAULT true,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role, is_demo, portal_enabled)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(COALESCE(NEW.email, ''), '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'nutritionist'),
    COALESCE((NEW.raw_user_meta_data->>'is_demo')::boolean, false),
    COALESCE((NEW.raw_user_meta_data->>'portal_enabled')::boolean, false)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_water_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_meal_plans ENABLE ROW LEVEL SECURITY;

-- Helper: current user role from profiles (not user_metadata)
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role <> 'patient'
  );
$$;

-- Profiles policies
CREATE POLICY profiles_select_own ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_staff());

CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE
  USING (id = auth.uid() OR public.is_staff());

CREATE POLICY profiles_insert_staff ON public.profiles FOR INSERT
  WITH CHECK (public.is_staff() OR id = auth.uid());

-- Patients: staff see all non-demo or all; patients see own
CREATE POLICY patients_staff_all ON public.patients FOR ALL
  USING (public.is_staff());

CREATE POLICY patients_own_select ON public.patients FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY patients_own_update ON public.patients FOR UPDATE
  USING (user_id = auth.uid());

-- Patient data: staff + own patient record
CREATE POLICY weight_staff ON public.patient_weight_logs FOR ALL USING (public.is_staff());
CREATE POLICY weight_own ON public.patient_weight_logs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));

CREATE POLICY water_staff ON public.patient_water_logs FOR ALL USING (public.is_staff());
CREATE POLICY water_own ON public.patient_water_logs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));

CREATE POLICY photos_staff ON public.patient_progress_photos FOR ALL USING (public.is_staff());
CREATE POLICY photos_own ON public.patient_progress_photos FOR ALL
  USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));

CREATE POLICY messages_staff ON public.patient_messages FOR ALL USING (public.is_staff());
CREATE POLICY messages_own_select ON public.patient_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));
CREATE POLICY messages_own_insert ON public.patient_messages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));

CREATE POLICY meal_plans_staff ON public.patient_meal_plans FOR ALL USING (public.is_staff());
CREATE POLICY meal_plans_own ON public.patient_meal_plans FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_id AND p.user_id = auth.uid()));

-- Storage bucket for progress photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('progress-photos', 'progress-photos', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY progress_photos_upload ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'progress-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY progress_photos_read ON storage.objects FOR SELECT
  USING (bucket_id = 'progress-photos' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR public.is_staff()
  ));

-- Demo cleanup function (run from staff admin — service role or SQL editor)
CREATE OR REPLACE FUNCTION public.cleanup_demo_data()
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE deleted_users int;
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'Solo staff puede ejecutar limpieza demo';
  END IF;
  DELETE FROM public.patient_messages WHERE is_demo = true;
  DELETE FROM public.patient_progress_photos WHERE is_demo = true;
  DELETE FROM public.patient_water_logs WHERE is_demo = true;
  DELETE FROM public.patient_weight_logs WHERE is_demo = true;
  DELETE FROM public.patient_meal_plans WHERE is_demo = true;
  DELETE FROM public.patients WHERE is_demo = true;
  GET DIAGNOSTICS deleted_users = ROW_COUNT;
  DELETE FROM public.profiles WHERE is_demo = true;
  RETURN jsonb_build_object('ok', true, 'message', 'Demo data cleaned. Real users (is_demo=false) preserved.');
END;
$$;
