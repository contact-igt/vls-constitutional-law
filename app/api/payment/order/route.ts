import { programConfig, isRegistrationOpen } from "@/lib/program";
import { razorpayCredentials } from "@/lib/payment";

export async function POST() {
  const { keyId, secret } = razorpayCredentials();
  if (!isRegistrationOpen() || !programConfig.fee || !keyId || !secret)
    return Response.json({ error: "Paid registration is not available." }, { status: 409 });

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: Math.round(programConfig.fee * 100),
        currency: "INR",
        receipt: `${programConfig.pageName}-${Date.now()}`,
      }),
    });
    const order = await response.json();
    if (!response.ok || !order?.id) throw new Error("order failed");
    return Response.json(order, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not create the payment order. Please try again." }, { status: 502 });
  }
}
