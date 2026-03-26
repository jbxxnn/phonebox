I want to build a minimal, high-converting phone resell website using Next.js, Supabase, and Vercel. The website will serve as a platform to list phones reviewed by a YouTube/TikTok creator and allow users to contact for purchase via WhatsApp. The project should follow modern best practices for Next.js and Supabase. Here are the detailed requirements:

1. **Pages / Routes:**
   - **Home Page (`/`)**
     - Hero section with site title and tagline (e.g., "Buy Phones Reviewed by [Channel Name]")
     - Featured phones section (latest 5 phones)
     - Optional: embedded YouTube video from the channel
   - **Products Page (`/phones`)**
     - Grid of phones with:
       - Image
       - Name & brand
       - Short specs (RAM, storage, camera)
       - Price
       - CTA button: "Order via WhatsApp"
       - Optional: badge “Reviewed by [Channel Name]”
   - **Product Detail Page (`/phones/[id]`)**
     - Full specs
     - Image gallery
     - Embedded review video if available
     - Price & WhatsApp order button
   - **Admin Page (`/admin`)**
     - Simple authentication (email/password)
     - Add/Edit/Delete phones
     - Fields: name, brand, images, specs, price, review video URL, WhatsApp number

2. **Supabase Setup:**
   - Table: `phones`
     - id (uuid)
     - name (text)
     - brand (text)
     - images (array of text URLs)
     - specs (json or text)
     - price (numeric)
     - review_video_url (text)
     - whatsapp_number (text)
   - Table: `users` for admin authentication (Supabase Auth)
   - Secure API routes so only authenticated admin can add/edit/delete phones

3. **Functionality:**
   - Fetch phone data from Supabase using Next.js server-side rendering (SSR or SSG)
   - Filter/search by brand, price, or keyword (optional)
   - WhatsApp order button prefilled with a message: "Hi, I want to order [Phone Name] reviewed by [Channel Name]"
   - Admin panel uses Supabase client to manage phone records
   - Responsive and mobile-first layout

4. **Tech Stack:**
   - Next.js (latest stable)
   - Supabase (Postgres + Auth)
   - Tailwind CSS for styling
   - Vercel hosting
   - TypeScript preferred
   - Optional: next/image for image optimization

5. **Extra Features / Nice-to-Haves:**
   - Dark mode toggle
   - Email notifications on new order (optional)
   - Phone filtering by brand/price
   - SEO meta tags for each phone page

6. **Deliverables:**
   - Fully working Next.js project ready to deploy to Vercel
   - Clear instructions to set up Supabase and environment variables
   - Clean, modular code following Next.js best practices

Generate the full project scaffolding with all pages, Supabase integration, admin panel, WhatsApp buttons, and styling using Tailwind CSS.
