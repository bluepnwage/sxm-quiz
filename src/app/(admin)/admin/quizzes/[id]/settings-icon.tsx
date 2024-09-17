"use client";
import { ActionIcon } from "@aomdev/ui";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function SettingsIcon({ id }: { id: number }) {
  const router = useRouter();

  const onClick = () => router.push(`/admin/quizzes/${id}/settings`);

  return (
    <ActionIcon
      color="gray"
      onClick={onClick}
    >
      <Settings size={"75%"} />
    </ActionIcon>
  );
}
