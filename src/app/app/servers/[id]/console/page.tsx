
import ConsolePage from "@/components/console/console-page";


export default async function ServerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-full flex flex-col ">
      <ConsolePage serverId={id} />
    </div>  
  );
}
