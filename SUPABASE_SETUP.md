# Supabase Contact Form Setup Guide

## What's Been Added ✨

Your contact form now:
- ✅ Automatically captures submission timestamps (`created_at`)
- ✅ Records user agent information for analytics
- ✅ Shows the exact date/time when a message was sent
- ✅ Stores all responses in your Supabase `contacts` table
- ✅ Includes functions to retrieve and display your submissions

---

## Supabase Database Setup 🗄️

### 1. Create the `contacts` Table

In your Supabase dashboard, run this SQL query:

```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  read BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Set Up Row Level Security (RLS)

For public submissions (recommended for contact forms):

```sql
-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (submit forms)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT WITH CHECK (TRUE);

-- Allow only authenticated users to SELECT (you viewing your messages)
CREATE POLICY "Allow authenticated select" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Using the JavaScript Functions 🛠️

### Fetch All Submissions (with dates):
```javascript
// Get all submitted responses ordered by most recent
const responses = await getSubmittedResponses();
console.log(responses);
// Output: [{name: "John", email: "...", created_at: "2025-01-15T14:32:00Z", ...}, ...]
```

### Real-Time Updates:
```javascript
// Listen for new submissions as they arrive
subscribeToResponses();
// Will log: ✨ New submission received: {name: "Jane", ...}
```

### Access Submission Dates:
Each submission includes:
- `created_at` - ISO 8601 timestamp (UTC)
- `name`, `email`, `subject`, `message`
- `user_agent` - Browser/device info
- `id` - Unique submission ID

---

## Form Behavior 📝

1. **User fills form** → Sees validation messages
2. **User submits** → Button shows "Sending..."
3. **Success** → Shows message with exact timestamp like:
   - "✓ Message sent successfully! Saved at Jan 15, 2025, 02:32 PM"
4. **Button confirms** → Shows "✓ Sent!" in green for 2 seconds
5. **Form resets** → Ready for next submission

---

## View Your Submissions 👀

### Option A: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to "SQL Editor"
3. Run: `SELECT * FROM contacts ORDER BY created_at DESC;`

### Option B: Browser Console
```javascript
// Call this in browser console on your portfolio page
await getSubmittedResponses();
```

---

## Timestamps Format 📅

- **Stored Format**: ISO 8601 (UTC)
  - Example: `2025-01-15T14:32:45.123Z`
- **Display Format**: Localized to user's timezone
  - Example: `Jan 15, 2025, 02:32 PM`

---

## Environment Variables (Security) 🔐

Your credentials are already in `contact.js`:
- `SUPABASE_URL`: Your project URL
- `SUPABASE_KEY`: Your publishable key (safe to share in frontend)

⚠️ **Never share your SECRET key!** Only use the publishable key.

---

## Troubleshooting 🔧

**Submissions not appearing?**
1. Check Supabase dashboard → Table tab
2. Ensure RLS policies are set up
3. Check browser console for errors (`F12` → Console tab)

**Timestamps not showing?**
- Ensure `created_at` column exists in your table
- The JavaScript will auto-populate this

**Want to clear test data?**
```sql
DELETE FROM contacts WHERE created_at < '2025-01-15';
```

---

## Next Steps 🚀

1. ✅ Create the `contacts` table in Supabase
2. ✅ Set up RLS policies
3. ✅ Test the form on your portfolio
4. ✅ Check Supabase dashboard for submissions
5. ✅ Optional: Add email notifications in Supabase triggers
