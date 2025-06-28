"use client"
import { useMutation } from '@tanstack/react-query';
import { logout} from "@/app/lib/actions/api";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "@/app/utils/types";

export default function Home() {
    const router = useRouter();
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            console.log('Successfully logged out!');
            router.push('/login')
        },
        onError: (error) => {
            console.error('Error:', error);
        }
    });

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setRole(decoded.role);
            } catch {
                setRole(null);
            }
        }
    }, []);
  console.log(role);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="max-w-2xl mx-auto mt-20 text-center px-5 py-7 border rounded-2xl">
              <h1 className="text-3xl font-bold mb-6">Welcome</h1>
              <p className="text-red-500 mb-4 text-xl">{role} in our app</p>
              <div className="flex gap-x-3 text-white  mt-8">
              <button className="w-full max-w-[350] bg-amber-500 px-4 py-2 rounded cursor-pointer" onClick={() => router.push('/users')}>Admin panel (only for users with the admin role)</button>
              <button className="w-full max-w-[350] bg-cyan-500 px-4 py-2 rounded cursor-pointer" onClick={() => router.push('/items')}>Customer panel (only for users with the admin or customer roles)</button>
              </div>
               <div>
                   { role ?  <button
                  className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer mt-8 w-full max-w-[300]"
                  onClick={() => logoutMutation.mutate()}
              >
                  Logout
              </button> :
                       <div className="space-x-3"><button   className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mt-8 w-full max-w-[300]"
              onClick={() => router.push('/login')}>
                  Login
              </button>
                       <button
                       onClick={() => {router.push('/register')}}
                   className="bg-fuchsia-500 text-white px-4 py-2 rounded cursor-pointer mt-8 w-full max-w-[300]">
                   Registration
                       </button></div>
                   }
              </div>
          </div>


      </main>
    </div>
  );
}
