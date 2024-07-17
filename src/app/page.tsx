import React from "react";
import Link from "next/link";

import prisma from "@/databases/db";
import Form from "./form";

type DataItem = {
  id: string;
  slug: string;
  title: string;
};

export default async function Home() {
  const data = await prisma.template.findMany();

  return (
    <main>
      <Form />
      <ul className="ml-8">
        {data.map((data: DataItem, index: number) => (
          <Link href={`event/${data.slug}`} key={index}>
            {data.title}
          </Link>
        ))}
      </ul>
    </main>
  );
}
