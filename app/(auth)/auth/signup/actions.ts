"use server";

import { db } from "@/lib/db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { user } from "@/lib/schema";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signup(state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (z.string().min(1).email().safeParse(email).success !== true) {
    return { error: "Email is invalid." };
  }

  if (z.string().min(8).safeParse(password).success !== true) {
    return { error: "Password is invalid." };
  }

  const id = generateId(15);
  const hash = await new Argon2id().hash(password);

  try {
    await db.insert(user).values({ id, email, password: hash });

    const session = await lucia.createSession(id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }

  return redirect("/");
}
