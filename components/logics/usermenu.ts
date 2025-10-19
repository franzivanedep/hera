// components/logics/usermenu.ts
import { router } from "expo-router";
import type { Href } from "expo-router";

export type UserSubRoute =
  | "transactions" | "redemptions" | "activities" | "expired"
  | "redeem" | "tour" | "help" | "settings" | "legal";

const userHref = (page: UserSubRoute) => (`/user/${page}` as const);

export const go = (page: UserSubRoute) => {
  const href = userHref(page);
  router.push(href as unknown as Href); // safely coerces to Expo Router's Href union
};
