import useAuthStore from "../stores/authStore.ts";
import { useState } from "react";

type LoginProps = {
  authType: "Login" | "Sign up";
  handleAuthType: () => void;
};

export default function Auth({ authType, handleAuthType }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { login, signUp, loading } = useAuthStore();

  const handleLogin = async () => {
    login(email, password);
  };

  const handleSignUp = async () => {
    if (password === repeatPassword) {
      signUp(email, password);
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="absolute inset-0 flex items-center flex-col pt-[var(--spacing-1000)] gap-[var(--spacing-1000)]  bg-blue-950 z-10 ">
      <div>
        <img src="/assets/images/logo.svg" alt="app logo" />
      </div>
      <div className="flex flex-col bg-blue-900 p-[var(--spacing-400)] rounded-[var(--rounded-3xl)] max-w-[var(--modal-max-width)] w-full">
        {loading ? (
          <div className="text-white text-center">
            <svg
              className="animate-spin h-8 w-8 mx-auto text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p>Authenticating...</p>
          </div>
        ) : authType === "Login" ? (
          <>
            <h2 className="p-0 mb-10">{`${
              authType === "Login" ? "Login" : "Sign up"
            }`}</h2>
            <div className="flex flex-col mb-10 gap-4">
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              className="mb-6 px- text-preset-4 min-h-[var(--spacing-600)] cursor-pointer"
            >
              Login to your account
            </button>
            <p className="text-center text-preset-4">
              Dont have an account?{" "}
              <a
                onClick={handleAuthType}
                className="ml-2 text-preset-4"
                href="#"
              >
                Sign Up
              </a>
            </p>
          </>
        ) : authType === "Sign up" ? (
          <>
            <h2 className="p-0 mb-10">Login</h2>
            <div className="flex flex-col mb-10 gap-4">
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSignUp}
              className="mb-6 px- text-preset-4 min-h-[var(--spacing-600)] cursor-pointer"
            >
              Create an account
            </button>
            <p className="text-center text-preset-4">
              Already have an account?{" "}
              <a
                onClick={handleAuthType}
                className="ml-2 text-preset-4"
                href="#"
              >
                Login
              </a>
            </p>
          </>
        ) : (
          <p>Unknown auth type</p>
        )}
      </div>
    </div>
  );
}
