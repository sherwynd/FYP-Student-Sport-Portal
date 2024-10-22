import { register } from "@/actions/auth/registerAction";

export default async function Register() {
  return (
    <form action={register}>
      <div className="full-name-box">
        <label>Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Full Name"
        />
      </div>
      <div className="gender-box">
        <label>Gender</label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Enter Gender"
        />
      </div>
      <div className="email-box">
        <label>Email</label>
        <input type="text" id="email" name="email" placeholder="Enter Email" />
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
      <button type="submit">Register Now</button>
    </form>
  );
}
