# Backend Setup Guide: Contact Form & Message Pipeline

A step-by-step guide for setting up **Supabase** (Postgres database) and **Resend** (email delivery) for Jasmanjot Singh Sarna's portfolio contact form.

---

## What You Must Do By Hand (Manual Checklist)

Because these require logging into your private accounts, you must complete the following steps:
1. **Supabase**: Create a free project at [supabase.com](https://supabase.com), copy the Project URL & Service Role Key, and run `supabase/schema.sql`.
2. **Resend**: Create an account at [resend.com](https://resend.com) and copy your API key (`re_...`).
3. **Vercel**: Add the environment variables to your Vercel Project Settings and trigger a redeployment.

---

## Step 1: Set Up Supabase (PostgreSQL Database)

### 1.1 Create the Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (or sign up with GitHub).
2. Click **"New project"**.
3. Choose your organization, set a project name (e.g. `jasmanjot-portfolio`), choose a strong database password, and select the region nearest to India (e.g. `ap-south-1` Mumbai or `ap-southeast-1` Singapore).
4. Click **"Create new project"** and wait ~1–2 minutes for the database to provision.

### 1.2 Run the SQL Schema
1. In your Supabase project dashboard, click on the **"SQL Editor"** icon in the left navigation sidebar (looks like `>_`).
2. Click **"New query"**.
3. Copy the entire contents of the file [`supabase/schema.sql`](./supabase/schema.sql) in this repository and paste it into the editor.
4. Click the green **"Run"** button (or press `Ctrl + Enter` / `Cmd + Enter`).
5. You should see `Success. No rows returned`.

### 1.3 Verify Table & Row Level Security
1. Click on the **"Table Editor"** icon in the sidebar.
2. Select the **`contact_messages`** table.
3. Verify that a lock icon says **"RLS Enabled"** at the top right of the table view.
4. Because there are **no public policies**, visitors and clients using the public anon key cannot view or steal messages. Only your server-side API handler using the Service Role Key can insert and read records.

### 1.4 Copy Your Keys
1. In the left sidebar, click on the **"Project Settings"** gear icon &rarr; **"API"**.
2. Copy the following two values:
   - **Project URL**: looks like `https://abcdefghijkl.supabase.co` &rarr; this is `SUPABASE_URL`.
   - **`service_role` secret**: Under **"Project API keys"**, find the `service_role` key (click "Reveal"). It starts with `eyJhbG...` &rarr; this is `SUPABASE_SERVICE_ROLE_KEY`.
   *(⚠️ Warning: Never share the service_role key or commit it to GitHub. It bypasses Row Level Security).*

---

## Step 2: Set Up Resend (Email Delivery)

### 2.1 Create Your Account & Key
1. Go to [https://resend.com](https://resend.com) and sign up (using your email `jasmanjotsinghsarna@gmail.com` or GitHub).
2. In the left sidebar, click **"API Keys"**.
3. Click **"Create API Key"**, name it `portfolio-contact`, keep permission as **Full access**, and click **Add**.
4. Copy the key (starts with `re_...`) &rarr; this is `RESEND_API_KEY`.

### 2.2 What Needs a Verified Domain vs. What Does Not
- **For Initial Testing (No custom domain required)**:
  - Resend provides a free test sandbox address: `onboarding@resend.dev`.
  - With `onboarding@resend.dev`, you can send notification emails **only to the email address associated with your Resend account** (`jasmanjotsinghsarna@gmail.com`).
  - Set `CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"`. This works immediately without touching any DNS settings!
- **For Production (When you own `jasmanjotsarna.dev`)**:
  - In Resend, go to **"Domains"** &rarr; **"Add Domain"** &rarr; enter `jasmanjotsarna.dev`.
  - Add the 3 DNS records (DKIM, SPF, MX) at your domain registrar (e.g. Namecheap, Cloudflare, or GoDaddy).
  - Once verified, update `CONTACT_FROM_EMAIL="Jasmanjot Sarna <contact@jasmanjotsarna.dev>"`.

---

## Step 3: Configure Environment Variables

### 3.1 For Local Testing (`.env.local`)
Create a file named `.env.local` in the root of your project (which is automatically ignored by `.gitignore`):

```bash
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
RESEND_API_KEY="re_123456789abcdef"
CONTACT_TO_EMAIL="jasmanjotsinghsarna@gmail.com"
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
IP_HASH_SALT="random_secret_salt_string_12345"
```

### 3.2 For Production on Vercel
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Select your `portfolio-ai-os` project.
3. Click **"Settings"** &rarr; **"Environment Variables"** in the left menu.
4. Add each of the 6 variables above (Environment: Check **Production**, **Preview**, and **Development**).
5. Click **"Save"**.
6. Go to the **"Deployments"** tab, click the three dots `...` on your latest deployment, and click **"Redeploy"** to apply the new variables.

---

## Step 4: Viewing Messages & Managing Status in Supabase

### How to View Inbound Inquiries
1. Go to your Supabase project &rarr; click **"Table Editor"** &rarr; select **`contact_messages`**.
2. You will see every message with:
   - `created_at`: Exact timestamp.
   - `name`: Sender's name.
   - `email`: Sender's email address.
   - `message`: The message body.
   - `status`: Defaults to `new`.
   - `email_sent`: `true` if Resend successfully delivered the notification email to your inbox.

### How to Mark a Message as Replied
1. In the Supabase Table Editor row, double click the cell under the **`status`** column.
2. Change the value from `new` to **`replied`** (or `read`, `spam`).
3. Press `Enter` to save.

---

## Step 5: Test Checklist & Verification Commands

You can run these automated tests locally while your dev server (`http://localhost:3000`) is running.

### Test 1: Valid Submission (Success 200)
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Miller",
    "email": "sarah.miller@techfirm.com",
    "message": "Hello Jasmanjot, we reviewed your CareerOS project and would like to schedule an interview."
  }'
```
**Expected Response**: `HTTP/1.1 200 OK`
```json
{
  "success": true,
  "message": "Got it. I'll reply within a couple of days."
}
```

### Test 2: Invalid Email Address (Validation Error 400)
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "email": "not-a-valid-email",
    "message": "Checking out your AI agents."
  }'
```
**Expected Response**: `HTTP/1.1 400 Bad Request`
```json
{
  "error": "Validation failed",
  "errors": {
    "email": "Please enter a valid email address (e.g. name@domain.com)"
  }
}
```

### Test 3: Message Too Short / Too Long (Validation Error 400)
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "email": "alex@company.com",
    "message": "Hi"
  }'
```
**Expected Response**: `HTTP/1.1 400 Bad Request` with `"Message must be at least 10 characters long"`.

### Test 4: Honeypot Triggered (Silent 200, No DB/Email)
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpamBot 3000",
    "email": "spambot@promotions.com",
    "message": "Buy our SEO traffic packages immediately!",
    "website": "https://spam-link.ru"
  }'
```
**Expected Response**: `HTTP/1.1 200 OK` (The bot receives a fake 200 success response, but nothing is written to your database and no email is sent).

### Test 5: Rate Limiting (Exceeding 5 messages per hour &rarr; 429)
Submitting 6 requests in rapid succession from the same IP will trigger the rate limit on the 6th call:
**Expected Response**: `HTTP/1.1 429 Too Many Requests`
```json
{
  "error": "Too many messages sent. Please wait before submitting again."
}
```
Header returned: `Retry-After: 3600`.

### Test 6: Non-JSON Body Rejected (Unsupported Media Type 415)
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: text/plain" \
  -d 'Hello'
```
**Expected Response**: `HTTP/1.1 415 Unsupported Media Type`.
