"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hashPresent, setHashPresent] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    setHashPresent(!!hash);
    
    if (!hash) {
      setError('Invalid password reset link. Please request a new password reset.');
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!password || !confirmPassword) {
      setError('Both fields are required');
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
      const { error: resetError } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (resetError) throw resetError;

      setMessage('Password has been reset successfully');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white/80 dark:bg-slate-800/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-600/50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-slate-400">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border-l-4 border-red-500 dark:border-red-400">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border-l-4 border-green-500 dark:border-green-400">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">{message}</h3>
              </div>
            </div>
          </div>
        )}

        {hashPresent && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-5">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 dark:border-slate-600/50 bg-white dark:bg-slate-700/50 py-3 px-4 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-lg bg-gray-800 dark:bg-slate-100 py-3 px-4 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
