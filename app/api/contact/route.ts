import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, to_email } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple approach with EmailJS or a service
    // Option 1: Use Resend API (recommended for production)
    // Option 2: Use EmailJS (client-side, easier setup)
    // Option 3: Use Nodemailer with SMTP
    
    // For this implementation, we'll create a simple response
    // You'll need to integrate with an email service
    
    // Example with Resend (you'll need to install: npm install resend)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: to_email || 'xerosofro@outlook.com',
    //   subject: `Nuova richiesta da ${name}`,
    //   html: `
    //     <h2>Nuova Richiesta di Contatto</h2>
    //     <p><strong>Nome:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Telefono:</strong> ${phone || 'Non fornito'}</p>
    //     <p><strong>Servizio:</strong> ${service || 'Non specificato'}</p>
    //     <p><strong>Messaggio:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // For now, return success (you'll need to implement actual email sending)
    // TODO: Integrate with email service (Resend, SendGrid, or EmailJS)
    
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      service,
      message,
      to_email: to_email || 'xerosofro@outlook.com',
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully',
        // In production, remove this debug info
        debug: {
          recipient: to_email || 'xerosofro@outlook.com',
          timestamp: new Date().toISOString(),
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}







