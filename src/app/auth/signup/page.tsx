"use client";

import OAuthButtons from "@/components/oauth-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useActionState, useState } from "react";
import { Toaster, toast } from "sonner";
import { signup } from "./actions";

export default function OAuthPage() {
  const [formState, formAction] = useActionState(signup, {
    success: false,
  });

  

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center bg-accent dark:bg-background h-full w-full">
      <Toaster />
      <Card className="w-86">
        <CardHeader>
          <CardTitle className="text-lg">Sign Up to Mc-Pixie.</CardTitle>
          <CardDescription>Welcome to Mc-Pixie</CardDescription>
        </CardHeader>

        <CardContent>
          <OAuthButtons />
          <div className="my-6 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue manually
            </span>
          </div>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Kevin Teller"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {formState?.errors?.name && (
                  <p className="text-destructive text-sm">
                    {formState?.errors?.name}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formState?.errors?.email && (
                  <p className="text-destructive text-sm">
                    {formState?.errors?.email}
                  </p>
                )}
              </div>
              <div className="grid gap-2 transition-all">
                <Label>Password</Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formState?.errors?.password && (
                  <p className="text-destructive text-sm">
                    {formState?.errors?.password}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>

                  {formState?.errors?.signup && (
                  <p className="text-destructive text-sm">
                    {formState?.errors?.signup}
                  </p>
                )}

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="login" className="underline underline-offset-4">
                  Log In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="absolute bottom-4 mx-10 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
