// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export default async function Admin() {
  // const session = await auth();
  // const user = session?.user;
  // if (user?.role === "admin") {
  //   redirect("/");
  // }
  return <h1>Admin Page</h1>;
}
