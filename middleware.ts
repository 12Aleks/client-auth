import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import {JwtPayload} from "@/app/utils/types";


export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to home if not authenticated
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (request.nextUrl.pathname.startsWith('/users') && decoded.role !== 'admin') {
            console.log('TEST')
            return NextResponse.redirect(new URL('/', request.url)); // Redirect if not admin
        }

        if (request.nextUrl.pathname.startsWith('/items') && !(decoded.role === 'admin' || decoded.role === 'distributor')) {
            return NextResponse.redirect(new URL('/', request.url)); // Redirect if not admin
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/users/:path*'], // Protect all /users routes
};