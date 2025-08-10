import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

export default function FilesBreadCrump({ path }: { path: string }) {
  const router = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-sm text-muted-foreground"
            onClick={() => {
              if (path === "/") return;
              router.push("?path=/");
            }}
          >
            /
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path!.split("/").map((p, i) => {
          if (p == "") {
            return null;
          }
          return (
            <span
              className="flex flex-row items-center gap-1.5 sm:gap-2.5"
              key={p + i}
            >
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push("?path=/" + path);
                  }}
                >
                  {p}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
