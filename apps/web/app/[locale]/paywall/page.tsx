import { PaywallContent } from './components/paywall-content';

// ?trial=0 shows the same plan picker without any trial framing — used when
// someone's trial has already ended and they're choosing a plan to reactivate
// (see dashboard/practice/components/practice-locked.tsx), so they don't get
// offered a second free trial.
const PaywallPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ trial?: string }>;
}) => {
  const { trial } = await searchParams;
  return <PaywallContent withTrial={trial !== '0'} />;
};

export default PaywallPage;
