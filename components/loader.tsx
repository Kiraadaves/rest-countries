import { Oval } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="w-[10%] mx-auto">
            <Oval
              visible={true}
              height="100%"
              width="100%"
              color="#2f345d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
        </div>
    )
    
}

export default Loader;