import * as Notifications from "expo-notifications";

const trigger = {
  hour: 8,
  minute: 30,
  repeats: true,
};

const content = {
  title: "You've got a new notification 📬",
  // subtitle: "",
  body: "Here is the notification body",
  // data: { data: "data" },
  vibrate: true,
};

const schedulePushNotification = async (content = content) => {
  const identifier = await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });

  return identifier;
};

const cancelPushNotification = async (identifier) => {
  const status = await Notifications.cancelScheduledNotificationAsync(
    identifier
  );

  return status;
};

export { schedulePushNotification, cancelPushNotification };
