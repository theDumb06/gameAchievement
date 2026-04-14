import loginPageStyle from "./LoginPage.module.css";
import { useState } from "react";
import { registerUser } from "./api/auth";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await registerUser({
        username,
        email,
        password,
      });

      console.log("SUCCESS:", result);
      alert("User registered!");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={loginPageStyle.loginPageContainer}>
        <div className={loginPageStyle.loginContainer}>
          <h1>Signup</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Register</button>
        </div>
      </div>
    </form>
  );
}

export default SignupPage;
