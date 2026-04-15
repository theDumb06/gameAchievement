import loginStyles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "./api/auth";

function LoginPage() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const result = await login(
            email,
            password,
          );
    
          console.log("SUCCESS:", result);
          alert("Logged In!");
        } catch (err) {
          console.error(err);
          alert("Error logging in");
        }
      };

    return (
        <form onSubmit={handleSubmit}>
        <div className={loginStyles.loginPageContainer}>
            
            <div className = {loginStyles.loginContainer}>
                <h1>Login</h1>
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
            <button>Log In</button>
            <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        </form>
    );
}

export default LoginPage;