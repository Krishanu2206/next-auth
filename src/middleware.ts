import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import toast from 'react-hot-toast';
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const ispublic = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';
    if(ispublic && token){
      toast.error('You are already logged in')
      return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
    if(!ispublic && !token){
      toast.error("You must be logged in!")
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}