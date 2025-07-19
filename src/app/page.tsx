import SignOutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";

import { createClient as serverClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await serverClient();

  const {  data, error } = await supabase.auth.getUser();

  return (
    <div className="bg-background min-h-full flex items-center justify-center flex-col gap-5">
      <p>Hello {data.user?.email ?? "Mr. Unknown"}</p>
      {data.user == null ? <Button asChild><Link href="/auth/login">Login</Link></Button> : <SignOutButton />}
      <Button asChild><Link href="/app">Enter App</Link></Button>
    </div>
  );
}
