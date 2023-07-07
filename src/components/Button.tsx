import { useEffect, useState } from "react";

const Button = (props:any) => {

  const { content, func, status, type, children } = props;
  const [className, setClassName] = useState("");

  const loadingClassName="w-full bg-orange-700 text-white font-medium py-3 rounded-md opacity-70";
  const activeClassName="w-full bg-orange-700 text-white font-medium py-3 rounded-md";

  useEffect(() => {
    if (status === "active") {
      setClassName(activeClassName);
    } else {
      setClassName(loadingClassName)
    }
  }, [status])


  return (
    <button disabled={status !== "active" && true} onClick={type === "click" ? func : null} onSubmit={type === "submit" ? func : null} className={className}>
      {children ? children : status === "loading" ? "Loading..." : content}
    </button>
  )
}

export default Button