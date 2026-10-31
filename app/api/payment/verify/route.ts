import { handleEnquiry } from "@/lib/enquiry";
import { programConfig, isRegistrationOpen } from "@/lib/program";
import { validSignature } from "@/lib/payment";

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payment response." }, { status: 400 });
  }
  const orderId = typeof raw.razorpay_order_id === "string" ? raw.razorpay_order_id : "";
  const paymentId = typeof raw.razorpay_payment_id === "string" ? raw.razorpay_payment_id : "";
  const signature = typeof raw.razorpay_signature === "string" ? raw.razorpay_signature : "";
  if (!isRegistrationOpen() || !validSignature(orderId, paymentId, signature))
    return Response.json({ ok: false, error: "We could not verify this payment." }, { status: 400 });

  const headers = new Headers();
  for (const name of ["x-forwarded-for", "x-real-ip"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return handleEnquiry(new Request(request.url, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...raw, payment_status: "paid", amount: programConfig.fee }),
  }), true);
}
