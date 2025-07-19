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
import React, { useState } from "react";
import { login } from "./actions";
import { Toaster, toast } from "sonner";

export default function OAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(fromEvent: React.FormEvent<HTMLFormElement>) {
    fromEvent.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const error = await login(formData);

    if (error) {
      toast(error.message, { dismissible: true });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-accent  dark:bg-background h-full w-full">
      <Toaster />
      <Card className="w-86">
        <CardHeader>
          <CardTitle className="text-lg">Mc-Pixie Login</CardTitle>
          <CardDescription>Welcome back to the Mc-Pixie</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                  <a
                    href="recover"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <OAuthButtons />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="signup" className="underline underline-offset-4">
                  Sign up
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
