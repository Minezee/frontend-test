'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link'

// @Components
import Input from "@/components/UI/Input";
import Checkbox from "@/components/UI/Checkbox";

// @Hooks
import { usePostData } from "@/hooks/init";

// @Libraries
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync } = usePostData();
  const router = useRouter();

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const signupPayload = {
      email: email,
      username: username,
      password: password,
      name: {
        firstname: 'Users',
        lastname: username
      },
      address: {
        city: 'malang',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
      phone: '1-234-567-8910'
    }
    mutateAsync({ endpoint: '/users', payload: signupPayload })
      .then((res) => {
        toast.success("Success creating account")
        router.push("/login")
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <main className='w-full flex flex-row gap-20 min-h-screen p-5 lg:p-0'>
      <div className="hidden flex-1 w-full lg:flex flex-col items-center justify-center rounded-lg bg-[url('/assets/images/login-banner.jpg')] bg-cover bg-center contrast-50">
      </div>

      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className='w-full h-full flex flex-col items-start justify-center max-w-[400px]'>
          <form className='w-full flex flex-col p-8 border border-gray-500 rounded-lg bg-white/50 backdrop-blur-xl'>
            <h1 className='font-semibold text-3xl'>Sign up</h1>
            <p className='mt-2 text-sm text-gray-500'>Welcome! Please enter your details.</p>
            <p className='mt-2 text-sm text-gray-300'>fake signup btw</p>
            <div className='mt-5 w-full'>
              <Input value={email} onChange={setEmail} placeholder='Enter your email' label="Email" />
              <Input value={username} onChange={setUserName} placeholder='Enter your username' label="Username" />
              <Input value={password} onChange={setPassword} type='password' placeholder='Enter you password' label="Password" />
              <button type='submit' onClick={handleSignup} className='w-full py-2 text-white bg-primary rounded-lg mt-5'>Sign up</button>
              <p className='text-gray-500 text-sm text-center mt-5'>Already have an account? <Link className='text-primary' href={"/login"}>Login</Link></p>
            </div>
          </form>
        </div>
      </div>

    </main>
  )
}

export default LoginPage