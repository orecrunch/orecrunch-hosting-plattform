"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log(data.email);

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) { 
    
    return error;
  }

  redirect("/");
}

