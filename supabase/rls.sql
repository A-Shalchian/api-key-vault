-- ENABLE RLS ON BOTH TABLES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- USERS TABLE POLICIES - Users can only see/edit their own profile
CREATE POLICY "Users can manage own profile"
  ON public.users
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

-- API KEYS TABLE POLICIES - Users can only see/edit their own keys
CREATE POLICY "Users can manage own keys"
  ON public.api_keys
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);
