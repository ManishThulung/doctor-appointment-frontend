import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "hospitals" | "departments";
  count: number;
  label: string;
  icon: string;
  to: string;
};

export const StatCard = ({
  count = 0,
  label,
  icon,
  type,
  to,
}: StatCardProps) => {
  return (
    <Link href={to}>
      <div
        className={clsx("stat-card", {
          "bg-appointments":
            type === "appointments" || "hospitals" || "departments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        })}
      >
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            height={32}
            width={32}
            alt="appointments"
            className="size-8 w-fit"
            style={{ width: "auto", height: "auto" }}
          />
          <h2 className="text-32-bold text-black">{count}</h2>
        </div>

        <p className="text-14-regular">{label}</p>
      </div>
    </Link>
  );
};
