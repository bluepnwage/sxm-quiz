"use server";
import { z } from "zod";
import { getUser } from "@/lib/data-fetch/get-user";
import { createClient } from "@/lib/supabase/server";
import { errorActionReturn, successActionReturn, type ActionReturn } from "@/lib/action-return";
import { uploadImage } from "@/lib/upload-image";
const PasswordSchema = z.object({
  new_password: z.string(),
  confirm_password: z.string()
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
export type UpdatePasswordState = ActionReturn<PasswordSchemaType>;

export const updatePassword = async (
  prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> => {
  const { error, message } = await getUser();
  console.log("bruh");
  if (error)
    return {
      status: "error",
      message,
      inputErrors: null,
      submitId: crypto.randomUUID()
    };

  const schema = PasswordSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    if (schema.data.confirm_password !== schema.data.new_password) {
      return {
        status: "error",
        message: "Passwords do not match",
        inputErrors: null,
        submitId: crypto.randomUUID()
      };
    }
    const { error } = await createClient().auth.updateUser({
      password: schema.data.new_password
    });
    if (error) {
      return {
        status: "error",
        message: error.message,
        inputErrors: null,
        submitId: crypto.randomUUID()
      };
    }
    return {
      status: "success",
      message: "Password updated successfully",
      inputErrors: null,
      submitId: crypto.randomUUID()
    };
  } else {
    return {
      status: "error",
      inputErrors: schema.error.flatten().fieldErrors,
      message: "There was an error processing the data you provided",
      submitId: crypto.randomUUID()
    };
  }
};

const UserSchema = z.object({
  first_name: z.string().min(1, { message: "Must provide a first name" }),
  last_name: z.string().min(1, { message: "Must provide a last name" })
});

export type UserSchemaType = z.infer<typeof UserSchema>;
type UserSchemaState = ActionReturn<UserSchemaType>;

export async function updateUser(prevState: any, formData: FormData): Promise<UserSchemaState> {
  "use server";
  const { data, error } = await getUser();
  if (error) return errorActionReturn({ inputErrors: null, message: "User error" });
  const schema = UserSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    let profile = "";
    let profilePath = "";

    const image = formData.get("default_image")?.toString();
    if (!image) {
      const newImage = formData.get("image") as File;
      const { path, url } = await uploadImage(newImage, `users/${data.id}`);
      profile = url;
      profilePath = path;
    } else {
      profile = image;
    }
    const newData: Record<string, string> = {
      ...schema.data
    };
    if (profile) {
      newData.profile_image = profile;
    }
    if (profilePath) {
      newData.profile_path = profilePath;
    }
    await createClient().from("profiles").update(newData).eq("id", data.id);
    return successActionReturn("Profile updated");
  } else {
    return errorActionReturn({
      inputErrors: schema.error.flatten().fieldErrors,
      message: "Something went wrong"
    });
  }
}
