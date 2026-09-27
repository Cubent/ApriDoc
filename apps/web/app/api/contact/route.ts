import { getResendClient } from '@repo/email';
import { NextRequest, NextResponse } from 'next/server';

const SUPPORT_INBOX = 'support@medprepinstitute.com';

// Escapes user input before it goes into the HTML email body.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_TOKEN) {
      console.error('Contact form: RESEND_TOKEN is not set, cannot send email.', { name, email });
      return NextResponse.json(
        { error: 'Email is not configured yet' },
        { status: 500 }
      );
    }

    const { error } = await getResendClient().emails.send({
      // RESEND_FROM must be an address on a domain verified in the Resend
      // dashboard (Domains), or sending fails even with a valid API key.
      from: process.env.RESEND_FROM ?? `MedPrep Institute Contact Form <${SUPPORT_INBOX}>`,
      to: SUPPORT_INBOX,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    });

    if (error) {
      console.error('Contact form: Resend returned an error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
