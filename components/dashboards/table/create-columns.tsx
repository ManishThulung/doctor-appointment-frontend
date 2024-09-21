import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column, ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import VerifyModal from "@/components/modals/verify-modal";

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
): ColumnDef<T> => ({
  accessorKey: key,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={headerName} />
  ),
  cell: ({ row }) => {
    const value = row.original[key] as React.ReactNode;
    if (key === "action") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
    } else if (
      key == "isEmailVerified" ||
      key === "isVerified" ||
      key === "status"
    ) {
      return (
        <Switch checked={row.original[key] as boolean} disabled aria-readonly />
      );
    }

    return <div className={`${isUppercase ? "uppercase" : ""}`}>{value}</div>;
  },
});

// export const createColumn = <T extends object>(
//   key: keyof T,
//   headerName: string,
//   isUppercase = false
// ): ColumnDef<T> => ({
//   accessorKey: key,
//   header: ({ column }) => (
//     <DataTableColumnHeader column={column} title={headerName} />
//   ),
//   cell: ({ row }) => {
//     const value = row.original[key] as React.ReactNode;
//     console.log(value, "value");
//     console.log(row.original, "row.original");
//     // if (key === "action" && Array.isArray(value)) {
//     if (key === "action") {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(row.original && row.original?.name)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     }
//     // if (key === "code" && Array.isArray(value)) {
//     //   return (
//     //     <div className="flex space-x-2 ">
//     //       {value.map((code, index) => (
//     //         <Button
//     //           key={index}
//     //           variant="ghost"
//     //           onClick={code.callback}
//     //           className="text-xs p-2 hover:bg-transparent h-0 text-blue-500"
//     //         >
//     //           {code.label && <span>{code.label}</span>}
//     //         </Button>
//     //       ))}
//     //     </div>
//     //   );
//     // }

//     // if (
//     //   (key === 'status' || key === 'featured' || key === 'required') &&
//     //   value === ''
//     // )
//     // {
//     //   return (
//     //     <div className={`pl-4 ${isUppercase ? 'uppercase' : ''}  `}>
//     //       {value}
//     //     </div>
//     //   );
//     // } else if ((key === 'featured' || key === 'status') && !value) {
//     //   return (
//     //     <div className="pl-4 ">
//     //       <Switch />
//     //     </div>
//     //   );
//     // } else if (key === 'verify') {
//     //   return (
//     //     <div className="pl-4 ">
//     //       <Switch />
//     //     </div>
//     //   );
//     // } else if (key === 'history') {
//     //   const historyValue = row.original['history'];

//     //   return (
//     //     <div className={`pl-4 ${isUppercase ? 'uppercase' : ''} `}>
//     //       {historyValue ? (
//     //         <p className="text-white text-center font-medium bg-green-800 p-1 rounded-md dark: hover:underline">
//     //           {value}
//     //         </p>
//     //       ) : (
//     //         value
//     //       )}
//     //     </div>
//     //   );
//     // } else if (key === 'name' || key === 'user' || key === 'categoryName') {
//     //   return (
//     //     <div className={`pl-4 ${isUppercase ? 'uppercase' : ''} `}>
//     //       <p className="font-semibold  p-1 rounded-md dark: hover:underline">
//     //         {value}
//     //       </p>
//     //     </div>
//     //   );
//     // } else if (key === 'photo') {
//     //   return (
//     //     <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
//     //       <img
//     //         src={`${IMAGE_BASE_URI}${row.original.photo}`}
//     //         alt={row.original.name}
//     //         className="w-full h-full object-cover  "
//     //       />
//     //     </div>
//     //   );
//     // } else if (key === 'image') {
//     //   return (
//     //     <div className="ml-4 w-16 h-16  rounded-md flex items-center justify-center overflow-hidden">
//     //       <img
//     //         src={`${IMAGE_BASE_URI}${row.original.image}`}
//     //         alt={row.original.name}
//     //         className="w-full h-full object-cover  "
//     //       />
//     //     </div>
//     //   );
//     // }

//     return (
//       <div className={`pl-4 ${isUppercase ? "uppercase" : ""}`}>{value}</div>
//     );
//   },
// });
