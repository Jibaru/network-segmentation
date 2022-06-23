import { IP } from "../models/ip.model.js";

export function parseIp(ip) {
  const parts = ip.trim().split(".");

  for (let i = 0; i < parts.length; i++) {
    parts[i] = parseInt(parts[i]);
  }

  return IP.fromArray(parts);
}
