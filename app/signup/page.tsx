"use client";

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Mail, MailCheck, Lock, AlertCircle, User, Loader2 } from 'lucide-react';


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signupError) throw signupError;
      
      if (data.user) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              firstName,
              lastName,
            }),
          });

          if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message || 'Failed to create user');
          }

          setIsEmailSent(true);
        } catch (dbError) {
          console.error('Database error:', dbError);
          setError('Account created but database setup failed. Please contact support.');
        }
      }
    } catch (err: unknown) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl space-y-6 sm:space-y-8 bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50">
        <div>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
            {isEmailSent ? 'Verify your email' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-gray-600 dark:text-slate-400">
            {!isEmailSent && (
              <>
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>
              </>
            )}
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

        {isEmailSent ? (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center border-l-4 border-green-500 dark:border-green-400">
            <div className="flex flex-col items-center space-y-4">
              <MailCheck className="h-16 w-16 text-green-500 dark:text-green-400" stroke="currentColor" />
              <div className="text-center">
                <h3 className="text-xl font-medium text-green-800 dark:text-green-200">Verification email sent!</h3>
                <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                  We&apos;ve sent a verification link to <strong>{email}</strong>.<br />
                  Please check your inbox and click the link to activate your account.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/login" className="font-medium text-gray-800 dark:text-slate-100 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Return to login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-slate-300 mb-1 sm:mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full pl-10 sm:pl-12 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 sm:py-3.5 px-3 sm:px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="First"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-slate-300 mb-1 sm:mb-2">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 sm:py-3.5 px-3 sm:px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Last"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-slate-300 mb-1 sm:mb-2">
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
                  className="block w-full pl-10 sm:pl-12 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 sm:py-3.5 px-3 sm:px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-slate-300 mb-1 sm:mb-2">
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 sm:py-3.5 px-3 sm:px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-slate-300 mb-1 sm:mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 sm:py-3.5 px-3 sm:px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-gray-800 dark:bg-slate-100 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-semibold text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Creating account...
                </span>
              ) : 'Sign up'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
