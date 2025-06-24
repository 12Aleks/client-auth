'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {getUsers, logout} from "@/app/lib/actions/api";
import {useRouter} from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import UsersList from "@/app/components/users/UsersList";

interface JwtPayload {
    role: 'user' | 'admin' | 'distributor';
}

export default function Home() {
    const [visible, setVisible] = useState(false);
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);
    const router = useRouter();

    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: visible && role === 'admin', // if role is admin
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            console.log('Successfully logged out!');
            router.push('/login')
        },
        onError: (error) => {
            console.error('Error:', error);
        }
    })

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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="max-w-2xl mx-auto mt-20 text-center">
              <h1 className="text-3xl font-bold mb-6">Welcome</h1>
              <p className="py-5">Hello user your role is {role}</p>

              {role === 'admin' ? (
                  <div className="flex flex-col gap-y-4">
                      <button
                          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer max-w-[200px] w-full m-auto block"
                          onClick={() => setVisible(true)}
                      >
                          See all users
                      </button>

                      {visible && (
                          <div className="mt-4">
                              {isLoading && <p>Loading...</p>}
                              {error && <p className="text-red-500">Insufficient rights to view users</p>}
                              {data && <UsersList data={data} />}
                          </div>
                      )}
                  </div>
              ) : (
                  <p className="text-red-500 mb-4">You need a admin role in app</p>
              )}
              <div className="space-x-3">
              <button
                  className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer mt-8"
                  onClick={() => logoutMutation.mutate()}
              >
                  Logout
              </button>
              <button   className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mt-8"
              onClick={() => router.push('/login')}>
                  Login
              </button>
              </div>
          </div>

      </main>
    </div>
  );
}
