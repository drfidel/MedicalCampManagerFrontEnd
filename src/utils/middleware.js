import { NextRequest, NextResponse } from "next/server";
import { AuthStatus } from "./AuthStatus";

const protectedRoutes = ["/dashboard","/profile"]

export default function middleware (req){

    const loggedIn = AuthStatus()

    // if(!AuthStatus && protectedRoutes.includes(NextRequest.nextUrl.pathname)){
    //     const absoluteURL = new URL("/", req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString())
    // }

    if(loggedIn && !req.nextUrl.pathname.startswith('/dashboard')){
        return NextResponse.next()
    }

    if(!loggedIn && !req.nextUrl.pathname.startswith('/profile')){
        return Response.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: '/dashboard/:path*',
  }
