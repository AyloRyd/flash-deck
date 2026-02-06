import * as React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { Folder } from "~/lib/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { cn } from "~/lib/utils";

const ROOT_LABEL = "All";

type FolderBreadcrumbsProps = {
  path: Folder[];
  currentIsPage?: boolean;
  setLabel?: string;
  setId?: number;
  className?: string;
};

export function FolderBreadcrumbs({
  path,
  currentIsPage = true,
  setLabel,
  setId,
  className,
}: FolderBreadcrumbsProps) {
  const hasSet = setLabel != null;

  const items: Array<{ backHref: string; href: string; label: string; isCurrent: boolean }> = [];

  const hasFoldersInPath = path.length > 0;
  items.push({
    backHref: "/sets",
    href: "/folders",
    label: ROOT_LABEL,
    isCurrent: !hasFoldersInPath && !hasSet,
  });

  path.forEach((folder, index) => {
    const backHref =
      index === 0 ? "/folders" : `/folders/${path[index - 1]!.folder_id}`;
    const href = `/folders/${folder.folder_id}`;
    const isCurrent = !hasSet && currentIsPage && index === path.length - 1;
    items.push({
      backHref,
      href,
      label: folder.folder_name,
      isCurrent,
    });
  });

  if (hasSet && setLabel != null) {
    const backToFolderOrSets =
      path.length > 0 ? `/folders/${path[path.length - 1]!.folder_id}` : "/sets";
    items.push({
      backHref: backToFolderOrSets,
      href: setId != null ? `/sets/${setId}` : "#",
      label: setLabel,
      isCurrent: true,
    });
  }

  return (
    <Breadcrumb className={cn("mb-2", className)}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="inline-flex items-center gap-1">
              <Link
                to={item.backHref}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors shrink-0"
                aria-label={`Go back to ${item.backHref === "/sets" ? "Sets" : "previous"}`}
              >
                <ArrowLeft className="size-4" />
              </Link>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
