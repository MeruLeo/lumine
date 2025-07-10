import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  data: unknown
): void => {
  res.status(statusCode).json({ data, statusCode, success: true });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null
): void => {
  res.status(statusCode).json({ data, statusCode, message, success: false });
};
