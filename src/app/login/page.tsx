"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
      
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
   
   const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login response", response.status, response.data);
            if (response?.data?.success) {
                toast.success(response.data.message || 'Login successful');
                router.push('/profile');
            } else {
                const msg = response?.data?.error || response?.data?.message || 'Login failed';
                toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
            }
        } catch (error:any) {
            console.error('Login failed', error, { response: error?.response, request: error?.request });
            const serverMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Login failed';
            toast.error(typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage));
        } finally{
        setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0&&user.password.length>0){
            setButtonDisabled(false)
        }else{

            setButtonDisabled(true)
        }
    },[user]);

    

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 px-4">
        <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">Login</h1>
            <hr className="w-full mb-6" />
       
            <div className="flex flex-col space-y-4">
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
                onClick={onLogin}
                className="p-3 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={buttonDisabled || loading}
            >
                {loading ? 'Processing...' : 'Login here'}
            </button>
            <Link href="/signup" className="text-blue-500 hover:text-blue-600 text-center">Visit Signup page</Link>
            </div>
        </div>
    </div>
    )

}