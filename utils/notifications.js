import * as Notifications from "expo-notifications";

const defaultTrigger = {
  hour: 8,
  minute: 30,
  repeats: true,
};

const defaultContent = {
  title: "You've got a new notification 👻",
  body: "Here is the notification body",
  vibrate: true,
};

const schedulePushNotification = async (content, trigger) => {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: content ? content : defaultContent,
    trigger: trigger ? trigger : defaultTrigger,
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
