"use server";

import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signin(state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (z.string().min(1).email().safeParse(email).success !== true) {
    return { error: "Email is invalid." };
  }

  if (z.string().min(8).safeParse(password).success !== true) {
    return { error: "Password is invalid." };
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password.",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );

  if (!validPassword) {
    return {
      error: "Incorrect username or password.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
