import { login, google } from "@/actions/user";

export default async function Login() {
  return (
    <>
      <form action={login}>
        <div className="email-box">
          <label>Email</label>
          <input
            type="text"
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
      <form action={google}>
        <button type="submit">Google</button>
      </form>
    </>
  );
}
