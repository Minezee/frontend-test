'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link'

// @Components
import Input from "@/components/UI/Input";
import Checkbox from "@/components/UI/Checkbox";

// @Hooks
import { usePostData } from "@/hooks/init";

// @Helpers
import { setCookie } from "@/utils/helpers/setToken";

// @Libraries
import { toast } from "react-toastify";


const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { mutateAsync } = usePostData();
  const router = useRouter();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.loading("Authenticating your credentials...");
    const loginPayload = {
      username: username,
      password: password,
    }
    mutateAsync({endpoint: '/auth/login', payload: loginPayload})
    .then((res) => {
      setCookie("token", res.token, 30)
      toast.dismiss();
      router.push("/product")
      toast.success("Welcome! user");
    }).catch((err) => {
      toast.dismiss();
      toast.error("Error login");
    })
  }

  return (
    <main className='w-full flex flex-row gap-20 min-h-screen p-5 lg:p-0'>
      <div className="hidden flex-1 w-full lg:flex flex-col items-center justify-center rounded-lg bg-[url('/assets/images/login-banner.jpg')] bg-cover bg-center contrast-50">
      </div>

      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className='w-full h-full flex flex-col items-start justify-center max-w-[400px]'>
          <form className='w-full flex flex-col p-8 border border-gray-500 rounded-lg bg-white/50 backdrop-blur-xl'>
            <h1 className='font-semibold text-3xl'>Login</h1>
            <p className='mt-2 text-sm text-gray-500'>Welcome back! Please enter your details.</p>
            <div className='mt-5 w-full'>
              <Input value={username} onChange={setUserName} placeholder='Enter your username' label="Username" />
              <Input value={password} onChange={setPassword} type='password' placeholder='Enter you password' label="Password" />
              <div className='flex items-center justify-between'>
                <Checkbox active={remember} onChange={setRemember} label='Remember for 30 days'/>
              </div>
              <button type='submit' onClick={handleLogin} className='w-full py-2 text-white bg-primary rounded-lg mt-5'>Sign in</button>
              <p className='text-gray-500 text-sm text-center mt-5'>Don't have an account? <Link className='text-primary' href={"/signup"}>Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>

    </main>
  )
}

export default LoginPage