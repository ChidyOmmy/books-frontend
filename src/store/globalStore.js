import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  openSnackbar: false,
  snackbarSeverity: "info",
  snackbarMessage: "message",
  setOpenSnackbar: () =>
    set((state) => ({ openSnackbar: !state.openSnackbar })),
  setSnackbarSeverity: (severity) => set({ snackbarSeverity: severity }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message })
}));
