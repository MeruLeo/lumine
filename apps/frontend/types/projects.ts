export type IProjectsSec = {
  name: string;
  icon: any;
  link: string;
  color: string;
  secondColor: string;
  count: number;
};

export interface IModel {
  _id: string;
  fullName: string;
  modelingCode: string;
}
export interface IProject {
  _id: string;
  name: string;
  model: IModel;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  startDate: Date;
  endDate: Date;
  budget: number;
  category: "fashion" | "advertisement" | "editorial" | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectBoxProps = Pick<
  IProject,
  | "_id"
  | "name"
  | "description"
  | "startDate"
  | "endDate"
  | "model"
  | "category"
  | "status"
>;

export type ProjectInfoProps = {
  icon: any;
  title: "وضعیت" | "مدل" | "دسته بندی" | "بودجه" | "تاریخ شروع" | "تاریخ پایان";
  value: string | React.ReactNode;
};
