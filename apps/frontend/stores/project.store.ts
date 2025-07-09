import { create } from "zustand";

import API from "@/lib/axios";

type StatusType = "pending" | "in_progress" | "completed" | "cancelled";
type CategoryType = "fashion" | "advertisement" | "editorial";

export interface Project {
  _id: string;
  name: string;
  status: StatusType;
  category: CategoryType | null;
  startDate?: string;
  endDate?: string;
  budget?: number;
  description?: string;
  model?: {
    _id: string;
    fullName: string;
    modelingCode: string;
  };
}

interface ProjectStore {
  projects: Project[];
  filteredProjects: Project[];
  searchTerm: string;
  currentProject: Project | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  fetchByModelId: (modelId?: string) => Promise<void>;
  fetchByModelingCode: () => Promise<void>;
  fetchByStatus: (status: StatusType) => Promise<void>;
  fetchByStatusWithModelingCode: (status: StatusType) => Promise<void>;
  fetchByCategory: (category: CategoryType) => Promise<void>;
  fetchByName: (name: string) => Promise<void>;

  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  clearError: () => void;
  resetCurrent: () => void;
  resetProjects: () => void;
  setSearchTerm: (value: string) => void;
  applySearchFilter: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  filteredProjects: [],
  searchTerm: "",
  currentProject: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const res = await API.get("/projects");
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch projects" });
    } finally {
      set({ loading: false });
    }
  },

  fetchById: async (id) => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/${id}`);

      set({ currentProject: res.data.data.project, error: null });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch project" });
    } finally {
      set({ loading: false });
    }
  },

  fetchByModelId: async (modelId) => {
    set({ loading: true });
    try {
      const url = modelId ? `/projects/model/${modelId}` : `/projects/model`;
      const res = await API.get(url);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by model",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchByModelingCode: async () => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/model-code`);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by model",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchByStatus: async (status) => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/status/${status}`);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by status",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchByStatusWithModelingCode: async (status) => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/status/model-code/${status}`);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by status",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/category/${category}`);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by category",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchByName: async (name) => {
    set({ loading: true });
    try {
      const res = await API.get(`/projects/name/${name}`);
      const projects = res.data.data.projects;

      set({ projects, filteredProjects: projects, error: null });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch projects by name",
      });
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (data) => {
    set({ loading: true });
    try {
      const res = await API.post("/projects", data);
      const newProject = res.data.data.project;

      set((state) => ({
        projects: [newProject, ...state.projects],
        filteredProjects: [newProject, ...state.filteredProjects],
        error: null,
      }));
    } catch (err: any) {
      set({ error: err || "Failed to create project" });
    } finally {
      set({ loading: false });
    }
  },

  updateProject: async (id, data) => {
    set({ loading: true });
    try {
      const res = await API.put(`/projects/${id}`, data);
      const updated = res.data.data.project;

      set((state) => ({
        projects: state.projects.map((p) => (p._id === id ? updated : p)),
        filteredProjects: state.filteredProjects.map((p) =>
          p._id === id ? updated : p,
        ),
        currentProject:
          state.currentProject?._id === id ? updated : state.currentProject,
        error: null,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to update project" });
    } finally {
      set({ loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true });
    try {
      await API.delete(`/project/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        filteredProjects: state.filteredProjects.filter((p) => p._id !== id),
        currentProject:
          state.currentProject?._id === id ? null : state.currentProject,
        error: null,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to delete project" });
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (value) => {
    set({ searchTerm: value });
    get().applySearchFilter();
  },

  applySearchFilter: () => {
    const { projects, searchTerm } = get();

    if (!searchTerm.trim()) {
      set({ filteredProjects: projects });

      return;
    }

    const filtered = projects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    set({ filteredProjects: filtered });
  },

  clearError: () => set({ error: null }),
  resetCurrent: () => set({ currentProject: null }),
  resetProjects: () => set({ projects: [], filteredProjects: [] }),
}));
