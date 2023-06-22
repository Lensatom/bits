import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { SignIn } from '../firebase/auth';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e:any) => {
    e.preventDefault()
    const data = await SignIn(email, password)
    console.log(data)
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-10 px-3">
      <h2 className="text-xl font-semibold text-orange-700">Hello mate 🚀</h2>
      <p className="text-gray-700">Let's get you logged-in</p>
      <form onSubmit={submit} className="flex flex-col gap-2 mt-10 w-full border-t-[1px] pt-10">
        <label className=" font-medium text-gray-700">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-md p-3 bg-gray-200"/>
        <label className="mt-5 font-medium text-gray-700">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-md p-3 bg-gray-200"/>
        <button onSubmit={submit} className="bg-orange-700 text-white font-medium py-3 rounded-md mt-5">Login</button>
      </form>
      <p className="mt-5">Do not have an account? <NavLink to="/register" className="text-orange-700">Create an account</NavLink></p>
    </div>
  )
}

export default Login