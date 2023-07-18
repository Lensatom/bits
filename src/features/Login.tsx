import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { SignIn } from '../firebase/auth';
import { InputField } from '../components';
import Button from '../components/Button';
import { useSelector } from 'react-redux';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonStatus, setButtonStatus] = useState<"active" | "inActive" | "loading">("active");
  const navigate = useNavigate()
  const state:any = useSelector((state:any) => state.userData)
  
  useEffect(() => {
    if (state !== null) {
      navigate("/")
    }
  }, [])

  const submit = async (e:any) => {
    e.preventDefault()
    setButtonStatus("loading")
    setEmailError("")
    setPasswordError("")
    const data = await SignIn(email, password)
    if (typeof(data) !== "string") {
      navigate('/')
    } else if (data === "auth/wrong-password"){
      setButtonStatus("active")
      setPasswordError("Incorrect email/password")
    } else if (data === "auth/user-not-found"){
      setButtonStatus("active")
      setEmailError("User does not exist")
    } else {
      console.log(data)
      setPasswordError("An unknown error occured")
      setButtonStatus("active")
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-10 px-3">
      <h2 className="text-xl font-semibold text-orange-700">Hello mate 🚀</h2>
      <p className="text-gray-700">Let's get you logged-in</p>
      <form onSubmit={submit} className="flex flex-col gap-5 mt-10 w-full border-t-[1px] pt-10">
        <InputField value={email} func={setEmail} type="email" label="Email" error={emailError} />
        <InputField value={password} func={setPassword} type="password" label="Password" error={passwordError} />
        <Button func={submit} type="submit" status={buttonStatus} content="Login" />
      </form>
      <p className="mt-5">Do not have an account? <NavLink to="/register" className="text-orange-700">Create an account</NavLink></p>
    </div>
  )
}

export default Login