const DEVICE_KEY = "nebula_device_id";

function generateDeviceId(): string {
  const random = crypto.randomUUID().replace(/-/g, "");
  return `nebula_${random}`;
}

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let deviceId = localStorage.getItem(DEVICE_KEY);

  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(DEVICE_KEY, deviceId);
  }

  return deviceId;
}
