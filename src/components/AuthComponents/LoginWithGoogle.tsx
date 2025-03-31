import React from "react";
import Button from "./ButtonComponentForAuth";
import Image from "next/image";

const LoginWithGoogle: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = "https://normplov-api.shinoshike.studio/api/v1/auth/google";
    };


    return (
        <Button
            type="button"
            text="Login with Google"
            onClick={handleGoogleLogin}
            icon={
                <Image
                    unoptimized
                    src="/assets/google.png"
                    width={24}
                    height={24}
                    alt="Google icon"
                />
            }
            className="w-full border-2 border-primary text-textprimary"
        />

    );
};

export default LoginWithGoogle;