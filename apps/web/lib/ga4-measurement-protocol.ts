const MP_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

type PurchaseInput = {
  /** Stripe invoice id: GA4 uses it (as transaction_id) to drop duplicate deliveries. */
  eventId: string;
  /** GA4 client_id captured client-side at checkout and carried through Stripe metadata. */
  clientId?: string;
  value: number;
  currency: string;
};

// Mirrors sendMetaPurchase in meta-capi.ts: a real purchase happens when the
// trial ends and Stripe charges the card, days after the visitor left the
// site, so gtag.js in the browser can never see it. This reports it
// server-side through the GA4 Measurement Protocol, which is what lets
// Google Ads import "Purchase" as a conversion goal from GA4. It needs
// NEXT_PUBLIC_GA_MEASUREMENT_ID (already public) plus a GA4_API_SECRET
// (GA4 Admin > Data Streams > your stream > Measurement Protocol API
// secrets), and quietly does nothing until both are set.
export const sendGA4Purchase = async ({ eventId, clientId, value, currency }: PurchaseInput) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) {
    console.warn('GA4_API_SECRET or NEXT_PUBLIC_GA_MEASUREMENT_ID is not set: skipping GA4 Purchase event');
    return;
  }
  if (!clientId) {
    // No client_id means the checkout session never recorded one (e.g. GA
    // was blocked), so there's nothing to attribute this purchase to.
    console.warn('No GA4 client_id for this subscription: skipping GA4 Purchase event');
    return;
  }

  try {
    const response = await fetch(
      `${MP_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: 'purchase',
              params: {
                transaction_id: eventId,
                value,
                currency: currency.toUpperCase(),
              },
            },
          ],
        }),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) {
      console.error('GA4 Measurement Protocol error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('GA4 Measurement Protocol request failed:', error);
  }
};
