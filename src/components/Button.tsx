import { useEffect, useState } from "react";

const Button = (props:any) => {

  const { content, func, status, type } = props;
  const [className, setClassName] = useState("");

  const loadingClassName="bg-orange-700 text-white font-medium py-3 rounded-md opacity-70";
  const activeClassName="bg-orange-700 text-white font-medium py-3 rounded-md";

  useEffect(() => {
    if (status === "active") {
      setClassName(activeClassName);
    } else {
      setClassName(loadingClassName)
    }
  }, [status])


  return (
    <button disabled={status !== "active" && false} onClick={type === "click" && func} onSubmit={type === "submit" && func} className={className}>
      {status === "loading" ? "Loading..." : content}
    </button>
  )
}

export default Button