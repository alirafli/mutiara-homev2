import React from "react";
import { Metadata } from "next";
import SigninForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

async function Signin() {
  return (
    <div className="h-[calc(100vh-200px)]">
      <SigninForm />
    </div>
  );
}

export default Signin;
