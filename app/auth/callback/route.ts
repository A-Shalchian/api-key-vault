import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Failed to verify email. Please try again.')}`, requestUrl.origin)
      );
    }
    
    if (data?.session) {
      return NextResponse.redirect(
        new URL(`/login?verified=true&email=${encodeURIComponent(data.session.user.email || '')}`, requestUrl.origin)
      );
    }
  }
  
  return NextResponse.redirect(new URL('/login?verified=true', requestUrl.origin));
}
