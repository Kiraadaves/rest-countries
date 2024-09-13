import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-[10%] mx-auto flex justify-center items-center mt-40">
      <Oval
        visible={true}
        height="100%"
        width="100%"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
