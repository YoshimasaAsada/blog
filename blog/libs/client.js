/**
 * microcmsとの繋ぎ込みのやつ
 */
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "yasd",
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});
