// import { login, google } from "@/actions/user";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export default async function Login() {
  // const session = await auth();
  // const user = session?.user;
  // if (user) {
  //   redirect("/");
  // }
  return (
    <>
      <form
      // action={login}
      >
        <div className="email-box">
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="password-box">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <form
      // action={google}
      >
        <button type="submit">Google</button>
      </form>
    </>
  );
}
