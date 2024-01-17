"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "./lucia";

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return null;
  }

  const result = await lucia.validateSession(sessionId);

  return result.user;
});
