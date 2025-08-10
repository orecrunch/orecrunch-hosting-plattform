import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Card } from "../ui/card";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function InfoCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="row-span-1 col-span-1 min-h-17 flex p-4 items-center flex-row gap-2">
      {children}
    </div>
  );
}
