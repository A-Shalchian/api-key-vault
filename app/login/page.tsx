"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, AlertCircle, CheckCircle, Loader2, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const verified = searchParams.get('verified');
    const verifiedEmail = searchParams.get('email');
    const errorMsg = searchParams.get('error');

    if (verified === 'true') {
      if (verifiedEmail) {
        setEmail(decodeURIComponent(verifiedEmail));
        setMessage('Email verified successfully! You can now log in.');
      } else {
        setMessage('Your account has been verified. Please log in.');
      }
    }

    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data?.session) {
        router.push('/');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to reset your password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setMessage('Password reset instructions sent to your email');
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50">
        <div>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-gray-200 dark:bg-slate-700 p-3 shadow-md">
              <Shield className="h-10 w-10 text-gray-700 dark:text-slate-300" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign up now
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border-l-4 border-red-500 dark:border-red-400">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border-l-4 border-green-500 dark:border-green-400">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">{message}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-gray-800 dark:text-slate-100 focus:ring-gray-400 dark:focus:ring-slate-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-slate-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                onClick={handlePasswordReset}
                className="font-medium text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-gray-800 dark:bg-slate-100 py-3 px-4 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
