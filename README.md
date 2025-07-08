# 🌟 Lumine Modeling Agency Platform

A full-stack modeling agency management system built with cutting-edge web technologies.  
It handles everything from model applications to project assignments and internal communication.

---

## 🚀 Features

- ✨ **Model Registration**: Accept and review applications with photo uploads, bios, and portfolios.
- 👨‍💼 **Admin Panel**: Approve/reject models, assign them to projects, manage their availability.
- 📝 **Project Management**: Create modeling projects, assign models, set deadlines, and status.
- 📥 **File Uploads**: Models and admins can attach reference files and photos to each project.
- 🔔 **Real-Time Notifications**: Receive alerts when a model is assigned or when a project is updated.
- 💬 **Task Comments**: Model-specific tasks can have threaded discussions between admins and models.
- 🎫 **Ticket System**: Internal support tickets for models to contact agency staff.

---

## 🛠️ Tech Stack

**Frontend** (Next.js App - located in `apps/frontend`):
- Next.js 14 (App Router)
- Tailwind CSS
- Zustand (Global State)
- TypeScript

**Backend** (Node.js API - located in `apps/backend`):
- Express.js
- MongoDB (via Mongoose)
- JWT Auth (Access + Refresh Token Flow)
- File Upload (Multer)
- Role-based Authorization

---

## 📁 Folder Structure

```bash
/
├── apps/
│   ├── frontend/     # Next.js application
│   └── backend/      # Express.js REST API
├── shared/           # Shared types or configs (optional)
├── .gitignore
├── README.md
