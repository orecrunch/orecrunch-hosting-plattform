export default function ConsoleGrid({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<div className="grid 2xl:grid-cols-4 xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-4  auto-rows-[230px]">
  {children}
</div>
  );
}
