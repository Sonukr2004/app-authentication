"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
      try{
        setLoading(true);
       const response=await axios.post("/api/users/signup",user);
       console.log("signup success",response.data);

            } catch (error: any) {
                console.error('signup failed', error, { response: error?.response, request: error?.request });
                const serverMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Signup failed';
                toast.error(typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage));
            } finally {
                setLoading(false);
            }
    }

        // improved signup handler that redirects on success
        const onSignupWithRedirect = async () => {
            try {
                setButtonDisabled(true);
                setLoading(true);
                const response = await axios.post('/api/users/signup', user);
                console.log('signup success', response.data);
                if (response?.data?.success) {
                    toast.success('Signup successful — please login');
                    // redirect to login page
                    router.push('/login');
                } else if (response?.data?.error) {
                    toast.error(response.data.error);
                }
            } catch (err: any) {
                console.error('signup failed', err, { response: err?.response, request: err?.request });
                const serverMessage = err?.response?.data?.error || err?.response?.data?.message || err?.message || 'Signup failed';
                toast.error(typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage));
            } finally {
                setLoading(false);
                setButtonDisabled(false);
            }
        }

    

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 px-4">
        <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
  {loading ? "Processing" : "Signup"}
</h1>

            <hr className="w-full mb-6" />
            <div className="flex flex-col space-y-4">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input 
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black bg-white w-full"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input 
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black bg-white w-full"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input 
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black bg-white w-full"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
                onClick={onSignupWithRedirect}
                className="p-3 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 hover:text-blue-600 text-center">Visit login page</Link>
            </div>
        </div>
    </div>
    )

}