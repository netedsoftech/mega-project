import React, { useState } from "react";
import authService from "../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError('')
    try {
        const userData = await authService.createAccount(data);
        if (userData) {
           const userData =  await authService.getCurrentUser()
           if(userData) dispatch(login(userData));
           navigate("/");
        }
    } catch (error) {
        setError(error.message)
    }
  }
  return <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-white100 rounded-xl p-10 border-black/10`}>
    <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account?</h2>
        <p className="mt-2 text-center text-base text-black/60" >
        Already have an account?
            <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">Login</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"></p>}
        <form onSubmit={handleSubmit(create)}>
        <div className="space-y-5">
            <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", {
                required: true,
            })}
            />

<Input label="Email:" placeholder="Enter your email" type="email" {...register('email', {
                required: true,
                validate: {
                    matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                    test(value) ||
                    "Email address must be a valid address",
                }
            })} />

            <Input label="Password:" placeholder="Enter your Password" type="password" {...register('password', {
                required: true
            })} />
            <Button type="submit" className="w-full">Create Account</Button>
        </div>
        </form>
    </div>
  </div>;
}

export default Signup;
