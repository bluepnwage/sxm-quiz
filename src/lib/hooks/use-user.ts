import useSWR from "swr";
import { createClient } from "../supabase/client";

const client = createClient();

async function fetcher() {
  const { data, error } = await client.auth.getUser();
  if (error) {
    throw new Error(error.message, { cause: error });
  }

  const { data: userData, error: userError } = await client
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (userError) {
    throw new Error(userError.message, { cause: userError });
  }

  return {
    ...userData,
    email: data.user.email
  };
}

export function useUser() {
  return useSWR("user", fetcher);
}
