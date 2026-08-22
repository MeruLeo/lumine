export const ProfileTabs = {
  Overview: "overview",

  Projects: "projects",

  Requests: "requests",

  Portfolio: "portfolio",

  TechnicalInfo: "technical-info",
} as const;

export type ProfileTab = (typeof ProfileTabs)[keyof typeof ProfileTabs];
