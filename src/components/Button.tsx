import { useEffect, useState } from "react";

type Props = {
  content?: string
  func?: any
  status: "active" | "loading" | "inActive"
  type: "click" | "submit"
  children?: React.ReactNode
  className?: string
}

const Button = (props:Props) => {

  const { content, func, status, type, children, className:customClassName } = props;
  const [className, setClassName] = useState("");

  const loadingClassName=`${ customClassName } w-full bg-orange-700 text-white font-medium py-3 rounded-md opacity-70`;
  const activeClassName=`${ customClassName } w-full bg-orange-700 text-white font-medium py-3 rounded-md`;

  useEffect(() => {
    if (status === "active") {
      setClassName(activeClassName);
    } else {
      setClassName(loadingClassName)
    }
  }, [status])


  return (
    <button disabled={status !== "active" && true} onClick={type === "click" ? func : undefined} onSubmit={type === "submit" ? func : undefined} className={className}>
      {children ? children : status === "loading" ? "Loading..." : content}
    </button>
  )
}

export default Button