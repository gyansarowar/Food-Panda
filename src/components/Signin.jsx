import { BsGoogle } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase/Firebase";
import { useEffect } from "react";
const Signin = () => {
  // if(!showModal){
  //   return null;
  // }

  const { signInWithGoogle, isLoggedIn } = useFirebase();
  const navigate = useNavigate();
  const withGoogle = () => {
    signInWithGoogle();
  };
  const withGuest = () => {
    navigate("/");
  };
  const onCancel = () => {
    navigate("/");
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <section className=" bg-opacity-50 fixed z-10  bg-orange-600 flex items-center w-screen justify-center overflow-hidden h-screen">
      <div className=" w-[350px] flex flex-col bg-orange-400  border border-orange-500 shadow-orange-600 shadow-md rounded-lg p-4">
        <h1 className="text-center leading-normal text-white font-medium text-4xl mb-6">
          Welcome to{" "}
          <span className="font-mono text-5xl p-4">
            FoodPanda<span className="align-bottom animate-pulse">!</span>
          </span>
        </h1>
        <h2 className=" mx-auto text-white text-2xl pb-4 font-semibold">
          Signup using
        </h2>
        <div className=" flex flex-row w-fit mx-auto pb-1 items-center space-x-12  justify-center">
          <button
            onClick={withGoogle}
            className=" border-2 hover:bg-orange-500 duration-500 rounded-full px-3 border-white py-3 text-white w-fit mx-auto flex flex-col justify-center items-center"
          >
            <BsGoogle size={30} />
            <span className=" font-medium">Google</span>
          </button>
          <button
            onClick={withGuest}
            className=" hover:bg-orange-500 duration-500 text-white w-fit mx-auto flex border-2 rounded-full px-4 border-white py-2 flex-col justify-center items-center"
          >
            <MdAccountCircle size={35} />
            <span className="font-medium">Guest</span>
          </button>
        </div>
        <div className=" flex items-center justify-center">
          <button
            onClick={onCancel}
            className="hover:bg-orange-500 duration-500 text-white font-medium mt-2 rounded-lg border-2 px-3 py-1 border-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signin;

// import { BsGoogle } from "react-icons/bs";
// import { MdAccountCircle } from "react-icons/md";
// import { useFirebase } from "../Firebase/Firebase"; // Import Firebase context

// const Signin = ({ showModal, onCancel }) => {
//   const { signInWithGoogle } = useFirebase(); // Get the Firebase sign-in function

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//       onCancel(); // Close the modal on successful login
//     } catch (error) {
//       console.error("Google Sign-in failed", error);
//     }
//   };

//   const handleGuestLogin = () => {
//     // Logic for guest login (if needed)
//     console.log("Logged in as Guest");
//     onCancel(); // Close the modal on guest login
//   };

//   if (!showModal) {
//     return null;
//   }

//   return (
//     <section className="bg-opacity-50 fixed z-10 bg-orange-600 flex items-center w-screen justify-center overflow-hidden h-screen">
//       <div className="w-[350px] flex flex-col bg-orange-400 border border-orange-500 shadow-orange-600 shadow-md rounded-lg p-4">
//         <h1 className="text-center leading-normal text-white font-medium text-4xl mb-6">
//           Welcome to{" "}
//           <span className="font-mono text-5xl p-4">
//             FoodPanda<span className="align-bottom animate-pulse">!</span>
//           </span>
//         </h1>
//         <h2 className="mx-auto text-white text-2xl pb-4 font-semibold">
//           Signup using
//         </h2>
//         <div className="flex flex-row w-fit mx-auto pb-1 items-center space-x-12 justify-center">
//           <button
//             onClick={handleGoogleSignIn}
//             className="border-2 hover:bg-orange-500 duration-500 rounded-full px-3 border-white py-3 text-white w-fit mx-auto flex flex-col justify-center items-center"
//           >
//             <BsGoogle size={30} />
//             <span className="font-medium">Google</span>
//           </button>
//           <button
//             onClick={handleGuestLogin}
//             className="hover:bg-orange-500 duration-500 text-white w-fit mx-auto flex border-2 rounded-full px-4 border-white py-2 flex-col justify-center items-center"
//           >
//             <MdAccountCircle size={35} />
//             <span className="font-medium">Guest</span>
//           </button>
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             onClick={onCancel}
//             className="hover:bg-orange-500 duration-500 text-white font-medium mt-2 rounded-lg border-2 px-3 py-1 border-white"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signin;
