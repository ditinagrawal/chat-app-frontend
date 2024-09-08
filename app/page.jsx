"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <main className="flex gap-4">
      {status === "authenticated" ? (
        <>
          <pre>{JSON.stringify(data)}</pre>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <pre>Status: {status}</pre>
          <Button onClick={() => signIn("google")}>Sign In</Button>
        </>
      )}
    </main>
  );
}
