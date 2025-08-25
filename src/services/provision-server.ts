import { ServerOrder } from "@/models/server";
import { createServiceClient } from "@/utils/supabase/service";
import "server-only";

export default async function provisionServer(server_order_id: string) {
  const serviceClient = createServiceClient();

  const { data: order, error: orderError } = await serviceClient
    .from("server_orders")
    .select("*")
    .eq("id", server_order_id)
    .single<ServerOrder>();

  if (!orderError) throw orderError;
  if (!order) throw new Error("Failed to retrieve server order");

  serviceClient
    .from("server_orders")
    .update({ status: "paid" })
    .eq("id", server_order_id);

  //Setting up node
  const { data: node, error: nodeError } = await serviceClient
    .from("server_nodes")
    .insert({
      server_order_id: server_order_id,
      status: "provisioning",
    })
    .single();

  if (!nodeError) throw nodeError;
  if (!node) throw new Error("Failed to create server node");


  
}
