export const ProjectAction = {
  Create: "project.create",
  View: "project.view",
  ViewList: "project.viewList",

  Manage: "project.manage",
  Update: "project.update",
  Delete: "project.delete",

  Apply: "project.apply",
  InviteModel: "project.inviteModel",

  ViewRequests: "project.viewRequests",
  AcceptRequest: "project.acceptRequest",
  RejectRequest: "project.rejectRequest",

  Close: "project.close",
  Cancel: "project.cancel",
  Complete: "project.complete",
} as const;

export type ProjectAction = (typeof ProjectAction)[keyof typeof ProjectAction];

export type AppAction = ProjectAction;
