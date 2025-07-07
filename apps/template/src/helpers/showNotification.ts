import { NotificationInstance } from "antd/es/notification/interface";

export const showNotification = (
  notificationInstance: NotificationInstance,
  message: string,
  type: "success" | "error" | "warning",
) => {
  notificationInstance[type]({
    message: message,
    placement: "topRight",
  });
};
