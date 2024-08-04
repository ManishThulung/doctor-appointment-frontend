import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "ram",
      email: "ram@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      age: 100,
      name: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
