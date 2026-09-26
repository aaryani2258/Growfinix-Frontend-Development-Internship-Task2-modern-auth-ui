import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logOut } from "./firebase";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setLogoutError("");
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
      setLogoutError("Unable to log out. Please try again.");
    }
  };

  const providerId = user?.providerData?.[0]?.providerId;

  const providerName =
    providerId === "google.com"
      ? "Google"
      : providerId === "github.com"
      ? "GitHub"
      : "Email";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Decorative background */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <section className="glass-card grid w-full overflow-hidden md:grid-cols-2">
          {/* Left-side branding section */}
          <div className="flex flex-col justify-between border-b border-white/10 p-7 md:min-h-[620px] md:border-b-0 md:border-r md:p-10">
            <div className="animate-fade-in">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
                  M
                </div>

                <div>
                  <p className="text-sm font-semibold tracking-wide text-white">
                    MODERNAUTH
                  </p>
                  <p className="text-xs text-slate-400">
                    Secure access, simplified
                  </p>
                </div>
              </div>

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
                Secure workspace
              </p>

              <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Authentication designed for a better user experience.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                A responsive authentication interface built with modern
                validation, secure Firebase social login, and refined visual
                design.
              </p>

              <div className="mt-9 space-y-4">
                <Feature
                  title="Validated forms"
                  description="Email regex validation, password rules, and meaningful feedback."
                />
                <Feature
                  title="Secure social sign-in"
                  description="Authenticate with Google or GitHub using Firebase Authentication."
                />
                <Feature
                  title="Responsive interface"
                  description="A polished layout designed for desktop, tablet, and mobile screens."
                />
              </div>
            </div>

            <p className="mt-10 text-xs text-slate-500">
              © {new Date().getFullYear()} ModernAuth UI · Portfolio Project
            </p>
          </div>

          {/* Right-side authentication section */}
          <div className="flex items-center justify-center p-7 sm:p-10">
            {isCheckingAuth ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-400/20 border-t-indigo-400" />
                <p className="mt-4 text-sm text-slate-300">
                  Checking your session...
                </p>
              </div>
            ) : user ? (
              <div className="w-full max-w-md animate-fade-in text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-green-400/40 bg-green-400/10">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User profile"}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-green-200">
                      {(user.displayName || user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-green-300">
                  Authentication successful
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Welcome{user.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
                </h2>

                <p className="mt-3 break-all text-sm text-slate-300">
                  {user.email || "Signed-in user"}
                </p>

                <div className="mt-7 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-left">
                  <p className="text-xs font-medium uppercase tracking-wider text-green-300">
                    Account status
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-300">Signed in with</span>
                    <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-semibold text-green-200">
                      {providerName}
                    </span>
                  </div>
                </div>

                {logoutError && (
                  <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
                    {logoutError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-primary mt-6"
                >
                  Log out securely
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300">
                  {isLogin ? "Welcome back" : "Create an account"}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {isLogin ? "Sign in to continue" : "Start your journey"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {isLogin
                    ? "Use your credentials or choose a social sign-in provider."
                    : "Create a secure account in a few simple steps."}
                </p>

                <div className="mt-8">
                  {isLogin ? (
                    <LoginForm
                      onSwitchToRegister={() => setIsLogin(false)}
                    />
                  ) : (
                    <RegisterForm
                      onSwitchToLogin={() => setIsLogin(true)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ title, description }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-400/15 text-xs font-bold text-indigo-200">
        ✓
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>
      </div>
    </div>
  );
}