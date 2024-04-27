/**
 * microcmsとの繋ぎ込みのやつ
 */
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "yasd",
  apiKey: "izfablnWrwjaKGauNbKAVMyjwhqaCQBESE5w",
});
