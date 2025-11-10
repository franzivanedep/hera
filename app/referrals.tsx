// pages/ReferralsPage.tsx
import React from "react";
import { useReferralsPage } from "../components/logics/useReferralLogic";
import { ReferralsPageView } from "../components/ReferralsPageView";

export default function ReferralsPage() {
  const { referralCode, loading, handleCopy } = useReferralsPage();

  return (
    <ReferralsPageView
      referralCode={referralCode}
      loading={loading}
      onCopy={handleCopy}
    />
  );
}
