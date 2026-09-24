import { useForm } from "react-hook-form";
import SocialButtons from "./SocialButtons";

function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function RegisterForm({ onSwitchToLogin }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");
  const strength = passwordStrength(password);

  const onSubmit = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 800));
      alert(`Registration successful for ${data.email}`);
    } catch {
      setError("root", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  const strengthLabel =
    ["Very weak", "Weak", "Fair", "Good", "Strong"][strength];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-up">
      {errors.root && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {errors.root.message}
        </div>
      )}

      <div>
        <label htmlFor="reg-name" className="mb-1 block text-sm font-medium text-gray-200">
          Full name
        </label>
        <input
          id="reg-name"
          type="text"
          autoComplete="name"
          className={`input-field ${errors.name ? "error" : ""}`}
          placeholder="John Doe"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="reg-email"
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
        <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          className={`input-field ${errors.password ? "error" : ""}`}
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "At least 8 characters",
            },
            validate: {
              hasUpper: (v) =>
                /[A-Z]/.test(v) || "Include at least one uppercase letter",
              hasNumber: (v) =>
                /[0-9]/.test(v) || "Include at least one number",
              hasSpecial: (v) =>
                /[^A-Za-z0-9]/.test(v) || "Include at least one special character",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>
        )}

        {password && (
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
              <span>Password strength</span>
              <span>{strengthLabel}</span>
            </div>
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(strength / 4) * 100}%`,
                  backgroundColor:
                    strength <= 1
                      ? "#ef4444"
                      : strength === 2
                      ? "#eab308"
                      : strength === 3
                      ? "#84cc16"
                      : "#22c55e",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="reg-confirm" className="mb-1 block text-sm font-medium text-gray-200">
          Confirm password
        </label>
        <input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          className={`input-field ${errors.confirmPassword ? "error" : ""}`}
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (v) => v === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-300">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <SocialButtons onGoogle={() => {}} onGitHub={() => {}} />

      <p className="text-center text-sm text-gray-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-indigo-300 hover:text-indigo-200"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}