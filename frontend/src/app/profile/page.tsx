'use client'

import ProfilePage from "@/components/ProfilePage/profilepage";
import { SessionProvider } from "next-auth/react";

export default function Profile() {
  return (
    <main>
      <SessionProvider>
        <ProfilePage />
      </SessionProvider>
    </main>
  );
}
