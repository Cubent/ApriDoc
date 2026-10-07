import { getResendClient } from '@repo/email';

const DAY_MS = 86_400_000;

const daysLeftText = (accessEndsAt: Date | null, now: number) => {
  if (!accessEndsAt) return 'You may lose access soon unless you update your payment method.';
  const days = Math.ceil((accessEndsAt.getTime() - now) / DAY_MS);
  if (days <= 1) return 'You will lose access within 24 hours unless you update your payment method.';
  return `You will lose access in ${days} days unless you update your payment method.`;
};

type PaymentFailedEmailInput = {
  email: string;
  accessEndsAt: Date | null;
  /** Stripe billing portal URL where the customer can update their card or retry the charge. */
  portalUrl: string;
};

// Mirrors sendMetaPurchase / sendGA4Purchase: fired from the Stripe webhook on
// invoice.payment_failed for a renewal charge (not the first charge right
// after the trial, which gets no email), so it quietly no-ops until
// RESEND_TOKEN is set rather than throwing and failing the webhook delivery.
export const sendPaymentFailedEmail = async ({
  email,
  accessEndsAt,
  portalUrl,
}: PaymentFailedEmailInput) => {
  if (!process.env.RESEND_TOKEN) {
    console.warn('RESEND_TOKEN is not set: skipping payment-failed email');
    return;
  }

  const deadline = daysLeftText(accessEndsAt, Date.now());
  const bodyText = `We could not process your latest payment. ${deadline} Your progress is saved and will be waiting once it is fixed.`;

  try {
    const { error } = await getResendClient().emails.send({
      from: process.env.RESEND_FROM ?? 'MedPrep Institute <billing@medprepinstitute.org>',
      to: email,
      subject: 'Payment failed, update your card to keep your access',
      text: `${bodyText}\n\nUpdate or retry your payment: ${portalUrl}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:480px;margin:0 auto;color:#111;">
          <p style="font-size:16px;font-weight:700;color:#06005A;margin:0 0 12px;">Payment failed</p>
          <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">${bodyText}</p>
          <a href="${portalUrl}" style="display:inline-block;background:#C46B10;color:#fff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;">
            Update or retry payment
          </a>
          <p style="font-size:13px;color:#666;margin-top:24px;">
            If the button does not work, copy and paste this link into your browser:<br />
            <a href="${portalUrl}" style="color:#06005A;">${portalUrl}</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend returned an error for the payment-failed email:', error);
    }
  } catch (error) {
    console.error('Payment-failed email request failed:', error);
  }
};
