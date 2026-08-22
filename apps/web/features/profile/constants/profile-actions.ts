export const ProfileAction = {
  View: "profile.view",

  UpdateBasicInfo: "profile.updateBasicInfo",

  UpdateTechnicalInfo: "profile.updateTechnicalInfo",

  UpdatePortfolio: "profile.updatePortfolio",

  ViewProjects: "profile.viewProjects",

  ViewRequests: "profile.viewRequests",

  AcceptRequest: "profile.acceptRequest",

  RejectRequest: "profile.rejectRequest",
} as const;

export type ProfileAction = (typeof ProfileAction)[keyof typeof ProfileAction];
