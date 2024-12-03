export const Button =({loading,loadingValue,signUp})=>{
    return(
        <button
        type="submit"
        className="w-full  bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        disabled ={loading}
      >
        {loading ? loadingValue:signUp}
      </button>
    )
}