
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  getFirebaseAuthErrorMessage,
  googleProvider,
  isFirebaseConfigured,
} from "@/lib/firebase";
import {
  Gamepad2,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  Trophy,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!auth || !isFirebaseConfigured) {
      toast.error("Firebase is not configured. Check the root .env.local file.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username").toString().trim();
    const email = formData.get("email").toString().trim();
    const password = formData.get("password").toString();

    setIsSubmitting(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: username });
      toast.success("Your account has been created!");
      router.push("/");
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!auth || !isFirebaseConfigured) {
      toast.error("Firebase is not configured. Check the root .env.local file.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up with Google!");
      router.push("/");
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080910] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
            <Gamepad2 size={25} />
          </div>
          <span className="text-xl font-black tracking-wide">
            NEX<span className="text-violet-400">PLAY</span>
          </span>
        </a>

        <p className="text-sm text-gray-400">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold text-violet-400 transition hover:text-cyan-300"
          >
            Log in
          </a>
        </p>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-12">
        {/* Left Hero Section */}
        <div className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Zap size={16} />
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1 className="max-w-xl text-5xl font-black leading-tight xl:text-7xl">
            ENTER THE
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              GAMEVERSE.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-400">
            Join a community of gamers, discover new adventures,
            challenge your limits, and make every match count.
          </p>

          {/* Gaming Visual */}
          <div className="relative mt-10 flex h-64 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950 via-[#17102c] to-cyan-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_60%)]" />

            <div className="relative flex h-36 w-36 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-violet-300/40 bg-violet-500/10 shadow-[0_0_80px_rgba(139,92,246,0.3)]">
              <Gamepad2
                size={82}
                strokeWidth={1.2}
                className="text-violet-300"
              />
            </div>

            <div className="absolute left-6 top-6 rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-md">
              <Trophy className="text-yellow-400" size={25} />
            </div>

            <div className="absolute bottom-6 right-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-gray-400">YOUR JOURNEY</p>
              <p className="mt-1 font-bold text-cyan-300">STARTS NOW</p>
            </div>

            <div className="absolute left-1/4 top-8 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
            <div className="absolute bottom-10 left-1/3 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
          </div>

          <div className="mt-7 flex flex-wrap gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Zap size={17} className="text-violet-400" />
              Epic adventures
            </span>
            <span className="flex items-center gap-2">
              <Trophy size={17} className="text-cyan-400" />
              Competitive gaming
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-300 lg:mx-0">
              <Gamepad2 size={30} />
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Level up your gaming experience. Join NEXPLAY today.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Username
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a gamer tag"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#11121c] py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#11121c] py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-white/10 bg-[#11121c] py-3.5 pl-12 pr-12 text-sm outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-violet-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Use at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-400">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-violet-500"
              />
              <span>
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-violet-400 hover:text-cyan-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-violet-400 hover:text-cyan-300"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-bold shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Signup UI */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#11121c] py-3.5 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black text-[#4285F4]">
              G
            </span>
            Sign up with Google
          </button>

          <p className="mt-7 text-center text-xs leading-6 text-gray-500">
            By joining, you're ready to explore a new world of gaming.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
