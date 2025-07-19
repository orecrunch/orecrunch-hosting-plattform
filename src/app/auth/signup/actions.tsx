"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string({
      message: "Email Required",
    })
    .email(),
  password: z
    .string({
      message: "Password Required",
    })
    .min(8, {
      message: "Name must contain at least 8 characters",
    })
    .max(30, {
      message: "Name must contain at most 30 characters",
    }),
  name: z
    .string({
      message: "Name Required",
    })
    .min(4, {
      message: "Name must contain at least 4 characters",
    })
    .max(25, {
      message: "Name must contain at most 25 characters",
    }),
});

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("username"),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
    };
  }

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.name,
        full_name: parsed.data.name,
      },
    },
  });

  if (error) {
    return {
      success: false,

      errors: {
        signup: [error.message],
      },
    };
  }

  redirect("/account");
}
