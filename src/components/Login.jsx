import { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase/Firebase";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const { auth, isLoggedIn, signInUserWithPhoneNumber, handleUser } =
    useFirebase();
  useEffect(() => {
    if (isLoggedIn || auth.currentUser) {
      navigate("/home");
    }
  }, [auth,isLoggedIn]);

  const onCaptchVerify = () => {
    if (ph.length > 0) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {
          // onSignup;
        },
        // "expired-callback": () => {},
      });
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    // console.log("formatPh", formatPh);
    // console.log("appVerifier", appVerifier);
    // console.log("auth", auth);

    signInUserWithPhoneNumber(formatPh, appVerifier)
      .then((confirmationResult) => {
        // console.log("confirmationResult", confirmationResult);

        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        // console.log("Error during signInWithPhoneNumber:", error);
        setLoading(false);
        toast.error("Failed to send OTP. Please try again.");
      });
  };

  const onOTPVerify = async () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        // console.log("res.user.phoneNumber", res.user.phoneNumber);
        // setUser(res.user);
        await handleUser(res.user).then(navigate("/home"));
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        toast.error("Wrong OTP. Please try again.");
      });
  };

  return (
    <section className="bg-orange-400 flex items-center justify-center overflow-hidden h-screen">
      <div className="bg-orange-400">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha"></div>
        {auth.currentUser == null ? (
          <div className="w-80 flex flex-col gap-4 border border-orange-500 shadow-orange-600 shadow-md rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to{" "}
              <span className="font-mono text-4xl p-4">
                FoodPanda<span className="align-bottom animate-pulse">!</span>
              </span>
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-orange-500 w-fit mx-auto p-4 rounded-full shadow-orange-600 shadow-lg">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="text-white font-bold text-2xl text-center font-mono"
                >
                  Enter OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength="6"
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                />
                <button
                  onClick={onOTPVerify}
                  className="shadow-orange-600 shadow-sm bg-orange-500 text-white font-mono rounded w-full flex items-center justify-center gap-1 py-2.5"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-orange-500 w-fit mx-auto p-4 rounded-full shadow-orange-600 shadow-lg">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="ph"
                  className="text-white font-bold text-2xl text-center font-mono"
                >
                  Verify Phone Number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="shadow-orange-600 shadow-sm bg-orange-500 text-white font-mono rounded w-full flex items-center justify-center gap-1 py-2.5"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        ) : (
          null
        )}
      </div>
    </section>
  );
};

export default Login;
