import { create } from 'zustand';

interface DashboardState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
