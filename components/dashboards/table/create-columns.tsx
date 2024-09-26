import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column, ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const createColumn = <T extends object>(
  key: keyof T,
  headerName: string,
  isUppercase = false
): ColumnDef<T, any> => ({
  accessorKey: key,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={headerName} />
  ),
  cell: ({ row }) => {
    const value = row.original[key] as React.ReactNode;
    if (key === "action") {
      const actionValue: any = row.original[key];
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="pl-2">
              <div className="flex gap-2 flex-col items-start">
                {actionValue && actionValue.length > 0 ? (
                  actionValue?.map((action: any, index: number) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={action.callback}
                      className="text-xs py-1 hover:bg-transparent h-auto"
                    >
                      {action.imgSrc && (
                        <img
                          src={action.imgSrc}
                          alt={action.label ?? ""}
                          className="w-4 h-4"
                        />
                      )}
                      {action.label && <span>{action.label}</span>}
                    </Button>
                  ))
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  row.original && (row.original as any)?.id
                )
              }
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <VerifyModal
              id={(row.original as any)?.id}
              name={(row.original as any)?.name}
            />
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (key === "image") {
      return (
        <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
              (row.original as any)?.image?.filename
            }`}
            alt={(row.original as any)?.name}
            className="w-full h-full object-cover"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      );
    } else if (key === "avatar") {
      return (
        <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
              (row.original as any)?.avatar?.filename
            }`}
            alt={(row.original as any)?.name}
            className="w-full h-full object-cover"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      );
    }
    // else if (key === "status") {
    //   return (
    //     <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
    //       <Image
    //         src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
    //           (row.original as any)?.avatar?.filename
    //         }`}
    //         alt={(row.original as any)?.name}
    //         className="w-full h-full object-cover"
    //         width={50}
    //         height={50}
    //         style={{ width: "auto", height: "auto" }}
    //       />
    //     </div>
    //   );
    // }
    else if (key == "isEmailVerified" || key === "isVerified") {
      return (
        <Switch checked={row.original[key] as boolean} disabled aria-readonly />
      );
    }

    return <div className={`${isUppercase ? "uppercase" : ""}`}>{value}</div>;
  },
});
