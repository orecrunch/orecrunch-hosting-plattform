import { User } from "@/models/wing";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = await createClient();

  try {
    const { token } = await request.json();
    const { data, error } = await client.auth.getUser(token);
    if (error) throw error;

    const user: User = {
      email: data.user.email!,

      permissions: {
        file_permissions: {
          home_dir: data.user.id,
          archive: true,
          create: true,
          delete: true,
          read: true,
          write: true,
          sftp: true,
        },
      },
    };
    return Response.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
