import { useAuth } from "../utilities/auth";

const Banner = ({ title }) => {
    const { user, signIn, signOut } = useAuth();
  
    return (
      <div className='d-flex justify-content-between w-100 m-4'>
        <h1 className='fs-2 fw-bold text-primar text-left'>{title}</h1>
        {user ? (
            <div className="flex items-center gap-4">
                {user.email}
            <button
                onClick={signOut}
                className="btn btn-outline-secondary btn-md mx-5"
            >
                Sign Out
            </button>
            </div>
        ) : (
            <div className="flex items-center gap-4">
            <button
                onClick={signIn}
                className="btn btn-outline-primary btn-md mx-5" 
            >
                Sign In
            </button>
            </div>
        )}
      </div>
    );
  };
  
  export default Banner;