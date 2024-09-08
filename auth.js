import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user;
      if (account.provider === "google") {
        try {
          const response = await fetch(`${process.env.NEXT_URL}/save-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, image }),
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      return user;
    },
  },
});
