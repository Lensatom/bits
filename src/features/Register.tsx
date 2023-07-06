import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { SignUp } from '../firebase/auth';
import { InputField } from '../components';
import Button from '../components/Button';
import { CheckIfUsernameIsInUse } from '../firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonStatus, setButtonStatus] = useState("active");
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
    setUsernameError("")
    setPasswordError("")
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      setButtonStatus("active")
      return false;
    }
    // Check if username has been taken
    const q = await CheckIfUsernameIsInUse(username);
    let count = 0;
    onSnapshot(q, async (snapshot) => {
      count++
      if (count === 1) {
        if (snapshot.docs.length > 0) {
          setButtonStatus("active")
          setUsernameError("Username taken")
        } else {
          // Register user, cancel onError
          const data = await SignUp(email, password, username)
          if (typeof(data) !== "string") {
            navigate('/')
          } else if (data === "auth/email-already-in-use"){
            setButtonStatus("active")
            setEmailError("Email has been used")
          } else {
            setPasswordError("An unknown error occured")
            setButtonStatus("active")
          }
        }
      }
    })
    
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-10 px-3">
      <h2 className="text-xl font-semibold text-orange-700">Hi! Welcome 👋</h2>
      <p className="text-gray-700">Let's get you an account</p>
      <form onSubmit={submit} className="flex flex-col gap-5 mt-10 w-full border-t-[1px] pt-10">
        <InputField value={email} func={setEmail} type="email" label="Email" error={emailError} />
        <InputField value={username} func={setUsername} type="text" label="Username" error={usernameError} />
        <InputField value={password} func={setPassword} type="password" label="Password" error={passwordError} />
        <Button func={submit} type="submit" status={buttonStatus} content="Register" />
      </form>
      <p className="mt-5">Already have an account? <NavLink to="/login" className="text-orange-700">Login</NavLink></p>
    </div>
  )
}

export default Register