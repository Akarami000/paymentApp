export const InputBox =({label,data,onChange,type,id,name,placeholder})=>{
    return(
        <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          placeholder={placeholder}
          name={name}
          value={data}
          onChange = {onChange}
        />
      </div>
    )
}