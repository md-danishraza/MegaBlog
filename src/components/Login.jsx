import { React, useState } from "react";
import { login as authLogin } from "../features/authSlice";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import auth from "../Services/auth";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      // login in aw with formdata
      const session = await auth.login(data);
      // if login is successful
      if (session) {
        // get userData from aw session
        const userData = await auth.getUser();
        // console.log(userData);
        if (userData) {
          // add to user auth state
          dispatch(authLogin({ userData }));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-[#4d425f] shadow-2xl shadow-[#6c35de] rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[200px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-white text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full bg-[#a364ff] py-4 hover:bg-[#6c35de] "
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
