"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { NextRequest } from "next/server";
import { useState, unstable_ViewTransition as ViewTransition } from "react";
import { toast, Toaster } from "sonner";

export default function HomePage() {
  const supabase = createClient();
  const [accessToken, setAccessToken] = useState<string>("");

  const [accountData, setAccountData] = useState<string>();

  async function requestAccessToken() {
    const { data, error } = await supabase.auth.getSession();

    setAccessToken(data.session?.access_token ?? "");
  }

  async function requestAccountDetail() {

    try {
      const res = await fetch("http://localhost:8080/account", {
        
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status != 200) throw res.statusText
      setAccountData(JSON.stringify(await res.json()));
    } catch (e) {
      toast(`Fetching failed: ${e}`,);
      return;
    }

    
  }

  return (
    <div className="h-full flex justify-center items-center flex-col gap-10 overflow-hidden">
        <Toaster />
      <div className="w-2xl inline-flex flex-col gap-4">
        <Label>Your Access Token:</Label>
        <Textarea
          placeholder="Click Request to request your access token."
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />
        <Button onClick={requestAccessToken}> Request </Button>
      </div>

      <div className="w-2xl inline-flex flex-col gap-4">
        <Label>Account Details</Label>
        <Textarea
          placeholder="Click Request to request your account data."
          value={accountData}
          onChange={(e) => setAccountData(e.target.value)}
        />
        <Button onClick={requestAccountDetail}> Request </Button>
      </div>
    </div>
  );
}
