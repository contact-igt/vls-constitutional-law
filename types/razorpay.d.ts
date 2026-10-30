interface RazorpayCheckout {
  open(): void;
  on(event: "payment.failed", callback: () => void): void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface Window {
  Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
}
