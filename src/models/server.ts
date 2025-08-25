export interface ServerOrder {
    id: string;
    user_id: string;
    server_node_id: string;
    stripe_session: string;
    threads: number;
    ram_gb: number;
    status: "pending" | "paid" | "provisioning" | "active" |"suspended" | "canceled";
    created_at: string;
}