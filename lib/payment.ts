import { createHmac, timingSafeEqual } from "node:crypto";
import { programConfig, isRegistrationOpen } from "./program";

export function razorpayCredentials() {
  return {
    keyId: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    // keyId: "rzp_test_Ss2NFtpJFLRAiw",
    secret: process.env.RAZORPAY_KEY_SECRET || "",
  };
}

export function paymentAvailable() {
  const { keyId, secret } = razorpayCredentials();
  return isRegistrationOpen() && typeof programConfig.fee === "number" && programConfig.fee > 0 && !!keyId && !!secret;
}

export function validSignature(orderId: string, paymentId: string, signature: string) {
  const { secret } = razorpayCredentials();
  if (!secret || !orderId || !paymentId || !signature) return false;
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
