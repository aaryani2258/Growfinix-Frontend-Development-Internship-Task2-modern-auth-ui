import { useForm } from "react-hook-form";
import { loginWithEmail } from "../firebase";
import SocialButtons from "./SocialButtons";

function getLoginErrorMessage(errorCode) {
  const errorMessages = {
    "auth/invalid-credential":
      "Incorrect email or password. Please try again.",
    "auth/user-not-found":
      "No account exists with this email address.",
    "auth/wrong-password":
      "Incorrect password. Please try again.",
    "auth/invalid-email":
      "Please enter a valid email address.",
    "auth/too-many-requests":
      "Too many failed attempts. Please wait a moment and try again.",
    "auth/network-request-failed":
      "Network error. Check your internet connection and try again.",
  };

  return errorMessages[errorCode] || "Unable to sign in. Please try again.";
}

export default function LoginForm({ onSwitchToRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await loginWithEmail(data.email, data.password);
    } catch (error) {
      console.error("Email login error:", error);

      setError("root", {
        type: "manual",
        message: getLoginErrorMessage(error.code),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-slide-up"
    >
      {errors.root && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200"
        >
          {errors.root.message}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Email address
        </label>

        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={`input-field ${errors.email ? "error" : ""}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-slate-200"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() =>
              alert(
                "Password reset can be added later using Firebase sendPasswordResetEmail."
              )
            }
            className="text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            Forgot password?
          </button>
        </div>

        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          className={`input-field ${errors.password ? "error" : ""}`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {errors.password && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.password.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <SocialButtons />

      <p className="pt-1 text-center text-sm text-slate-300">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-indigo-300 transition hover:text-indigo-200"
        >
          Create one
        </button>
      </p>
    </form>
  );
}