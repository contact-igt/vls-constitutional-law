import { handleEnquiry } from "@/lib/enquiry";

export async function POST(request: Request) {
  return handleEnquiry(request);
}
