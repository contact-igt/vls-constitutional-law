"use client";

import CountUp from "react-countup";

export function CountUpNumber({ value }: { value: string }) {
  return <CountUp end={Number(value)} duration={1.2} enableScrollSpy scrollSpyOnce />;
}
