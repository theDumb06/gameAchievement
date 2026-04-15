import loginStyles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className={loginStyles.loginPageContainer}>
            
            <div className = {loginStyles.loginContainer}>
                <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log In</button>
            <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default LoginPage;