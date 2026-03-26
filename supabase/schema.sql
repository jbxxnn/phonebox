-- Create the phones table
CREATE TABLE IF NOT EXISTS public.phones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price NUMERIC NOT NULL,
    specs JSONB DEFAULT '{}'::jsonb,
    images TEXT[] DEFAULT '{}'::text[],
    review_video_url TEXT,
    whatsapp_number TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to read phone listings
CREATE POLICY "Allow public read-only access" ON public.phones
    FOR SELECT USING (true);

-- Policy to allow only authenticated admin to modify listings
-- (Assuming the admin's email is used as an identifier if needed, 
-- or simply checking if the user is authenticated)
CREATE POLICY "Allow authenticated admin CRUD" ON public.phones
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
