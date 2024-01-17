"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Message } from "@/ui/message";
import { useFormState } from "react-dom";

export function SigninForm({
  action,
}: {
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<ActionResult | undefined>;
}) {
  const [state, formAction] = useFormState(action, { error: null });

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div className="flex flex-col gap-2">
        <Input
          className="bg-transparent border p-4"
          type="email"
          name="email"
          placeholder="example@domain.com"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          className="bg-transparent border p-4"
          type="password"
          name="password"
          placeholder="********"
          required
        />
      </div>
      {state?.error && <Message>{state.error}</Message>}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export interface ActionResult {
  error: string | null;
}
