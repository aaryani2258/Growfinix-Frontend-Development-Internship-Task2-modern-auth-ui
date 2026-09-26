import { useForm } from "react-hook-form";
import SocialButtons from "./SocialButtons";

function passwordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

function getStrengthDetails(strength) {
  const details = [
    {
      label: "Very weak",
      color: "#ef4444",
    },
    {
      label: "Weak",
      color: "#f97316",
    },
    {
      label: "Fair",
      color: "#eab308",
    },
    {
      label: "Good",
      color: "#84cc16",
    },
    {
      label: "Strong",
      color: "#22c55e",
    },
  ];

  return details[strength];
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
  const strengthDetails = getStrengthDetails(strength);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      // This is a frontend validation demo.
      // Google and GitHub registration/sign-in work through Firebase OAuth.
      alert(
        `Account form submitted successfully for ${data.name}. Connect Firebase email/password authentication to make email registration permanent.`
      );
    } catch (error) {
      console.error("Registration error:", error);

      setError("root", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-up">
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
          htmlFor="reg-name"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Full name
        </label>

        <input
          id="reg-name"
          type="text"
          autoComplete="name"
          placeholder="Aaryani Bharathiraja"
          className={`input-field ${errors.name ? "error" : ""}`}
          {...register("name", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            pattern: {
              value: /^[A-Za-z\s.'-]+$/,
              message: "Name can contain only letters and spaces",
            },
          })}
        />

        {errors.name && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="reg-email"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Email address
        </label>

        <input
          id="reg-email"
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
        <label
          htmlFor="reg-password"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Create password
        </label>

        <input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          className={`input-field ${errors.password ? "error" : ""}`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Include at least one uppercase letter",
              hasNumber: (value) =>
                /[0-9]/.test(value) || "Include at least one number",
              hasSpecialCharacter: (value) =>
                /[^A-Za-z0-9]/.test(value) ||
                "Include at least one special character",
            },
          })}
        />

        {errors.password && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.password.message}
          </p>
        )}

        {password && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Password strength</span>
              <span style={{ color: strengthDetails.color }}>
                {strengthDetails.label}
              </span>
            </div>

            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(strength / 4) * 100}%`,
                  backgroundColor: strengthDetails.color,
                }}
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Use 8+ characters, an uppercase letter, a number, and a special
              character.
            </p>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="reg-confirm"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Confirm password
        </label>

        <input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          className={`input-field ${
            errors.confirmPassword ? "error" : ""
          }`}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />

        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <div className="divider">
        <span>or continue with</span>
      </div>

      {/* Real Firebase Google and GitHub login */}
      <SocialButtons />

      <p className="pt-1 text-center text-sm text-slate-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-indigo-300 transition hover:text-indigo-200"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}