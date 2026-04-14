import loginPageStyle from "./LoginPage.module.css";

function SignupPage() {
  return (
    <div className={loginPageStyle.loginPageContainer}>
      <div className={loginPageStyle.loginContainer}>
        <h1>Signup</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default SignupPage;