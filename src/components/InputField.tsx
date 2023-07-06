
const InputField = (props:any) => {

  const { value, func, type, label, error } = props;

  return (
    <div className="w-full flex flex-col">
      <label className="font-medium text-gray-700">{label}</label>
      <input required value={value} onChange={(e) => func(e.target.value)} type={type} className="rounded-md p-3 mt-1 bg-gray-200"/>
      <span className="text-xs font-medium text-red-600 mt-1 px-3">{error}</span>
    </div>
  )
}

export default InputField