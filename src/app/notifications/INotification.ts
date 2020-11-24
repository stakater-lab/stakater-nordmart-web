export interface INotification {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration: number;
}
