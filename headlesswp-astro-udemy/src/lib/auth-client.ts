import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://ep-summer-credit-asecw16n.neonauth.c-4.eu-central-1.aws.neon.tech/neondb", // Neon Managed Auth
});

export const { signIn, signUp, signOut, useSession } = authClient;
