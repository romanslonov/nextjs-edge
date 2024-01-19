import { getUser } from "@/lib/get-user";
import { Button } from "@/ui/button";
import { logout } from "./actions";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1>Hello, {user?.email}</h1>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/login");
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
