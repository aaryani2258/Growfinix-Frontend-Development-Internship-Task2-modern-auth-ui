import { useForm } from "react-hook-form";
import SocialButtons from "./SocialButtons";

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
      await new Promise((res) => setTimeout(res, 800));

      if (data.email === "test@example.com" && data.password === "Password1!") {
        alert("Login successful!");
      } else {
        setError("root", {
          type: "manual",
          message: "Invalid email or password.",
        });
      }
    } catch {
      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-up">
      {errors.root && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {errors.root.message}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className={`input-field ${errors.email ? "error" : ""}`}
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className={`input-field ${errors.password ? "error" : ""}`}
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <SocialButtons
        onGoogle={() => {}}
        onGitHub={() => {}}
      />

      <p className="text-center text-sm text-gray-300">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-indigo-300 hover:text-indigo-200"
        >
          Create one
        </button>
      </p>
    </form>
  );
}