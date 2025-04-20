import React from "react";

type Props = {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
   return(
        <div className="container flex h-screen justify-center items-center mx-auto">
            {children}
        </div>
   ) 
}