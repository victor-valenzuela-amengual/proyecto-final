import { AiOutlineWarning } from "react-icons/ai";
const ErrorLogin = (error) => {
  return (
    <>
      <div>
        <p className="text-danger">
          {/* <i className="fa-sharp fa-solid fa-2xl fa-triangle-exclamation me-3"></i>{" "} */}
          <AiOutlineWarning  className="icon" />
          
          {error.error}
        </p>
      </div>
    </>
  );
};

export default ErrorLogin;
