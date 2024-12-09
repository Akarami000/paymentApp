import { Link } from 'react-router-dom';

export const ErrorMessage=({message})=>{
    if (!message) return null;
    return(
        <div className='w-full'>
        <label htmlFor='sign-in' className='block pt-1 text-center underline text-red-600 font-thin mb-1'>
            {message}
        </label>
        </div>
    )
}