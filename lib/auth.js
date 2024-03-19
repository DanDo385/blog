// lib/auth.js
import { useSession, signIn, signOut } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return { session: null, loading: true };

  if (!session) {
    return {
      session: null,
      loading: false,
      signIn: signIn,
    };
  }

  return {
    session: session,
    loading: false,
    signOut: signOut,
  };
}