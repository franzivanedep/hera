import { router, type Href } from "expo-router";

export const Routes = {
  transactions: "/user/transactions",
  redemptions: "/user/redemptions",
  activities: "/user/activities",
  expired: "/user/expired",
  redeem: "/user/redeem",
  tour: "/user/tour",
  help: "/user/help",
  settings: "/user/settings",
  legal: "/user/legal",
} as const;

type UserHref = (typeof Routes)[keyof typeof Routes];

export const go = (href: UserHref) => router.push(href as Href);
