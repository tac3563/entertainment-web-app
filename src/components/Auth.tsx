type LoginProps = {
  authType: "Auth" | "Sign up";
};

export default function Auth({ authType }: LoginProps) {
  return (
    <div className="absolute inset-0 flex items-center flex-col pt-[var(--spacing-1000)] gap-[var(--spacing-1000)]  bg-blue-950 z-10 ">
      <div>
        <img src="/assets/images/logo.svg" alt="app logo" />
      </div>
      <div className="flex flex-col bg-blue-900 p-[var(--spacing-400)] rounded-[var(--rounded-3xl)] max-w-[var(--modal-max-width)] w-full">
        {authType === "Auth" && (
          <>
            <h2 className="p-0 mb-10">Login</h2>
            <div className="flex flex-col mb-10 gap-4">
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="email"
                placeholder="Email address"
              />
              <input
                className="border-b border-blue-500 pb-4 pl-4"
                type="password"
                placeholder="Password"
              />
            </div>

            <button className="mb-6 px- text-preset-4 min-h-[var(--spacing-600)] cursor-pointer">
              Login to your account
            </button>
            <p className="text-center text-preset-4">
              Dont have an account?{" "}
              <a className="ml-2 text-preset-4" href="#">
                Sign Up
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
