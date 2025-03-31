'use client';

import React from 'react';
import Image from "next/image";

type SplashScreenProps = {
    onComplete: () => void;
}

export default function SplashScreenComponent({ onComplete }: SplashScreenProps) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed top-0 left-0 bg-primary-light min-h-screen w-full z-[100] flex justify-center items-center">
            <div className="bg-white rounded-full flex justify-center items-center p-4">
                <Image
                    src="/navbar/logo.png"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="object-cover"
                />
            </div>
        </div>
    );
}