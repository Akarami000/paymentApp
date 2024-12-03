import { Link } from 'react-router-dom';

export const Bottom=({message,name,link})=>{
    return(
        <div className='w-full'>
        <label htmlFor='sign-in' className='block pt-2 text-center text-gray-600 font-medium mb-2'>
            {message} <Link className='underline'  to={link}> {name}</Link>
        </label>
        </div>
    )
}