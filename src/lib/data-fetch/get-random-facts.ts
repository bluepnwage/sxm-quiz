import { createClient } from "../supabase/client";

export const getRandomFacts = async () => {
  const { data, error } = await createClient().from("random_facts").select("*");
  if (error) throw new Error("Failed to fetch data");
  return data;
};
