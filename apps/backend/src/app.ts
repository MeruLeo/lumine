import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./modules/routes/user.routes";
import authRouter from "./modules/routes/auth.routes";
import projectRouter from "./modules/routes/project.routes";
import ticketRouter from "./modules/routes/ticket.routes";
import notificationRouter from "./modules/routes/notification.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/v1/users", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/projects", projectRouter);
app.use("/v1/tickets", ticketRouter);
app.use("/v1/notifs", notificationRouter);

export default app;
