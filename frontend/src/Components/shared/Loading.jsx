import LoadingSvg from '../../assets/bean.svg'
const Loading =()=>{
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <img src={LoadingSvg} alt="Loading" className="w-18 h-18" />
  </div>
    )
}

export default Loading;