import { createClient } from "../supabase/client";



export async function fetchWing(url: string, options?: RequestInit, tries?: boolean): Promise<any> {
    const client = createClient();

    const { data : session, error } = await client.auth.getSession();
    if (error) throw error;
    const response = await fetch(url, {
        ...options,
        credentials: "same-origin",
        headers: {
            'Authorization': `Bearer ${session?.session?.access_token}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}