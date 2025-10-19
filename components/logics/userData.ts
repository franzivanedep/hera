import { useEffect, useState } from "react";

export type Tx = { id: string; title: string; subtitle: string };
export type Red = { id: string; reward: string; date: string };
export type Act = { id: string; action: string; when: string };
export type Exp = { id: string; amount: number; date: string };

export const useTransactions = () => {
  const [data, set] = useState<Tx[]>([]);
  useEffect(() => {
    set([
      { id: "t1", title: "Purchase #1001", subtitle: "Apr 12 • 12 pts" },
      { id: "t2", title: "Purchase #1002", subtitle: "Apr 10 • 8 pts" },
    ]);
  }, []);
  return { data };
};

export const useRedemptions = () => {
  const [data, set] = useState<Red[]>([]);
  useEffect(() => {
    set([{ id: "r1", reward: "Free Coffee", date: "Apr 09" }]);
  }, []);
  return { data };
};

export const useActivities = () => {
  const [data, set] = useState<Act[]>([]);
  useEffect(() => {
    set([
      { id: "a1", action: "Signed in", when: "Apr 07, 11:02" },
      { id: "a2", action: "Updated profile", when: "Apr 06, 09:20" },
    ]);
  }, []);
  return { data };
};

export const useExpiredPoints = () => {
  const [data, set] = useState<Exp[]>([]);
  useEffect(() => {
    set([{ id: "e1", amount: 10, date: "Mar 31" }]);
  }, []);
  return { data };
};

export const redeemVoucher = async (code: string) => {
  if (!code.trim()) return { ok: false, message: "Invalid code" };
  await new Promise(r => setTimeout(r, 400));
  return { ok: true, message: `Voucher ${code} redeemed` };
};
