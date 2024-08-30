import { Title, Button } from "@aomdev/ui";
import { Alert } from "@aomdev/ui";
import { notFound, redirect } from "next/navigation";
import { PasswordForm } from "./password-form";
import { getUser } from "@/lib/data-fetch/get-user";
import { UserForm } from "./form";

export default async function UserSettings() {
  const { error, data } = await getUser();
  if (error) notFound();
  const deleteAccount = async () => {
    "use server";
    redirect("/account-deleted");
  };

  return (
    <>
      <Title
        order={1}
        className="font-semibold text-4xl font-heading mb-16"
      >
        Settings
      </Title>
      <Title
        order={2}
        className="font-heading font-semibold mb-5 text-2xl"
      >
        Profile
      </Title>
      <hr className="h-1 border-neutral-700 w-full mb-10" />
      <div className="w-2/4">
        <UserForm
          first_name={data.first_name || ""}
          last_name={data.last_name || ""}
          profile_image={data.profile_image || ""}
        />
      </div>
      <Title
        order={2}
        className="font-heading font-semibold mb-5 mt-16 text-2xl"
      >
        Update password
      </Title>
      <hr className="h-1 border-neutral-700 w-full mb-10" />
      <div>
        <PasswordForm />
      </div>
      <Title
        order={2}
        className="font-heading font-semibold mb-5 mt-16 text-2xl"
      >
        Account deletion
      </Title>
      <hr className="h-1 border-neutral-700 w-full mb-10" />

      <Alert color="error">
        <div>
          <Title
            order={2}
            className="font-heading font-semibold mb-2 text-2xl text-error-50"
          >
            Delete account
          </Title>
          <p className="mb-10 text-lg text-error-50">Deleting your account is permanent.</p>
          <form
            className="w-1/4 space-y-6"
            action={deleteAccount}
          >
            <Button variant={"error"}>Delete Personal Account</Button>
          </form>
        </div>
      </Alert>
    </>
  );
}
