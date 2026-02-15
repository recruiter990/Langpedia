# Business Services Website - Setup Guide

## 📋 Overview

This is a complete business services website with:
- ✅ Animated stats counters
- ✅ SEO service card
- ✅ Professional service images
- ✅ Contact form with email delivery
- ✅ WhatsApp floating button
- ✅ Trust badges section
- ✅ Business footer with hours and email

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `next` - React framework
- `react` & `react-dom` - React library
- `lucide-react` - Icons (optional, not currently used)
- `@emailjs/browser` - Email service (for client-side email)

### 2. Set Up Email Service

You have **3 options** for email delivery:

#### Option A: EmailJS (Recommended - Easiest)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

Update `app/business/page.tsx` ContactForm component:

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID',       // Replace with your EmailJS Template ID
      {
        to_email: 'xerosofro@outlook.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'         // Replace with your EmailJS Public Key
    );
    
    setSubmitStatus('success');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Option B: Resend API (Recommended for Production)

1. Sign up at [Resend](https://resend.com/)
2. Get your API key
3. Install Resend: `npm install resend`

Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, service, message } = body;

  await resend.emails.send({
    from: 'onboarding@resend.dev', // Change to your verified domain
    to: 'xerosofro@outlook.com',
    subject: `Nuova richiesta da ${name}`,
    html: `
      <h2>Nuova Richiesta di Contatto</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${phone || 'Non fornito'}</p>
      <p><strong>Servizio:</strong> ${service || 'Non specificato'}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
```

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### Option C: Formspree (Simplest - No Code)

1. Sign up at [Formspree](https://formspree.io/)
2. Create a form
3. Update the form action in `app/business/page.tsx`:

```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="hidden" name="_to" value="xerosofro@outlook.com" />
  {/* form fields */}
</form>
```

## 🖼️ Images Setup

All service images are currently using Unsplash URLs. To use your own images:

1. Create `public/images/services/` directory
2. Add your images:
   - `social-media.jpg`
   - `seo.jpg`
   - `cold-email.jpg`
   - `delivery.jpg`
   - `gmb.jpg`
   - `content.jpg`
   - `consulting.jpg`
   - `scraping.jpg`
   - `monitoring.jpg`
   - `metrics.jpg`
   - `intelligence.jpg`

3. Update `app/business/page.tsx`:

```typescript
image: '/images/services/social-media.jpg',
```

## 📱 WhatsApp Button

The WhatsApp button is already configured with:
- Phone: `+393444104395`
- Pre-filled message: "Ciao! Vorrei informazioni sui vostri servizi"

To change the phone number, update `app/business/page.tsx`:
```tsx
href="https://wa.me/YOUR_PHONE_NUMBER?text=YOUR_MESSAGE"
```

## 🎨 Customization

### Colors
Update `tailwind.config.js` to match your brand colors.

### Stats Numbers
Update the stats array in `app/business/page.tsx`:
```typescript
const stats = [
  { value: 15, suffix: '+', label: 'Clienti Soddisfatti' },
  { value: 180, suffix: '%', label: 'Crescita Media Vendite' },
  { value: 850, suffix: 'K+', label: 'Impressioni Social' },
  { value: 35, suffix: 'K+', label: 'Email Inviate' },
];
```

### Services
Add/remove services in the `services` array in `app/business/page.tsx`.

## 🚀 Running the Website

### Development
```bash
npm run dev
```
Visit: http://localhost:3000/business

### Production Build
```bash
npm run build
npm start
```

## 📝 Testing Checklist

After setup, test:

- [ ] Stats counter animates on scroll
- [ ] SEO service card is visible (2nd or 3rd position)
- [ ] All service cards have images
- [ ] Contact form submits successfully
- [ ] Email arrives at xerosofro@outlook.com
- [ ] Success/error messages display correctly
- [ ] WhatsApp button opens chat
- [ ] All images load on mobile
- [ ] Website is responsive
- [ ] Footer shows correct email and hours

## 🔧 Troubleshooting

### Contact Form Not Sending
1. Check browser console for errors
2. Verify email service credentials
3. Check API route logs (if using serverless function)
4. Test with a simple email service first

### Images Not Loading
1. Check image URLs are accessible
2. Verify Next.js Image component configuration
3. Check browser network tab for 404 errors

### Stats Not Animating
1. Ensure Intersection Observer is supported
2. Check that stats section is scrollable
3. Verify `statsVisible` state updates

## 📧 Support

For issues or questions, contact: xerosofro@outlook.com







