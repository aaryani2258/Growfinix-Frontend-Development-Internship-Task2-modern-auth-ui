import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logOut } from "./firebase";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
        <div className="grid w-full gap-8 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
          {/* Left: branding / info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Welcome to ModernAuth
            </h1>

            <p className="mt-2 text-sm text-gray-600 md:text-base">
              A clean, secure authentication experience with email, password,
              and social logins.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Email validation with regex</li>
              <li>• Strong password rules & strength meter</li>
              <li>• Clear error messages & loading states</li>
              <li>• Social login buttons (Google, GitHub)</li>
            </ul>

            {user && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-800">
                  Logged in as
                </p>

                <p className="text-sm text-green-700">{user.email}</p>

                {user.displayName && (
                  <p className="text-sm text-green-700">
                    {user.displayName}
                  </p>
                )}

                {user.providerData[0]?.providerId && (
                  <p className="mt-1 text-xs text-green-600">
                    Signed in with: {user.providerData[0].providerId}
                  </p>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-3 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Right: form card */}
          <div className="rounded-xl border border-gray-100 p-6 shadow-sm md:p-8">
            {user ? (
              <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  You are signed in
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  Use the logout button on the left to sign out.
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-1 text-xl font-semibold text-gray-900">
                  {isLogin ? "Sign in" : "Create your account"}
                </h2>

                <p className="mb-6 text-sm text-gray-600">
                  {isLogin
                    ? "Enter your credentials to access your account."
                    : "Fill in your details to get started."}
                </p>

                {isLogin ? (
                  <LoginForm
                    onSwitchToRegister={() => setIsLogin(false)}
                  />
                ) : (
                  <RegisterForm
                    onSwitchToLogin={() => setIsLogin(true)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}