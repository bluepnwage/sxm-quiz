"use client";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { useUser } from "@/lib/hooks/use-user";

export function DashboardButton() {
  const { data, isLoading, error } = useUser();
  if (isLoading || error)
    return (
      <Link
        href={"/signin"}
        className={buttonStyles({ variant: "neutral", size: "sm" })}
      >
        Sign in
      </Link>
    );
  return (
    <>
      <Link
        className={buttonStyles({ variant: "neutral", size: "sm" })}
        href={data?.role === "admin" ? "/admin" : "/dashboard"}
      >
        Account
      </Link>
    </>
  );
}
