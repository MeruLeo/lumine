export const UserStatus = {
  Accept: "accept",
  Reject: "reject",
  Pending: "pending",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const Gender = {
  Male: "male",
  Female: "female",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const RequestStatus = {
  Pending: "pendding",
  Accepted: "accepted",
  Rejected: "rejected",
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];
