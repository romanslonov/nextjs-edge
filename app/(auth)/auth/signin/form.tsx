"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState } from "react";

export function SigninForm({
  action,
}: {
  action: (data: { email: string; password: string }) => Promise<void>;
}) {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    await action({ email, password });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto"
    >
      <div className="flex flex-col gap-2">
        <Input
          className="bg-transparent border p-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}

export interface ActionResult {
  error: string | null;
}
