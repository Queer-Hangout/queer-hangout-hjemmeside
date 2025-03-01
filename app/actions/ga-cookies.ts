"use server";
import { cookies } from "next/headers";

export async function getGAConsent(consentCookieName: string) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(consentCookieName)?.value;
  return cookieValue ? cookieValue === "true" : undefined;
}

export async function deleteGACookies(consentCookieName: string) {
  const cookieStore = await cookies();
  cookieStore
    .getAll()
    .map((c) => c.name)
    .filter((c) => c.startsWith("_ga") && c !== consentCookieName)
    .forEach((c) => cookieStore.delete(c));
}

export async function hasGACookies(consentCookieName: string) {
  const cookieStore = await cookies();
  return (
    cookieStore
      .getAll()
      .find((c) => c.name !== consentCookieName && c.name.startsWith("_ga")) !=
    null
  );
}
