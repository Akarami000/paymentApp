export const Label =({value})=>{
    return(
        <div className='w-full'>
        <label htmlFor='sign-in' className='block pt-2'>
            <span>{value}</span>
        </label>
        </div>
    )
}