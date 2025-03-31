'use client';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center`}>
            <div className={`text-start max-w-[350px] space-y-5`}>
                {/*<h1 className={`text-4xl font-bold text-red-600`}>404</h1>*/}
                {/*<p className={`text-2xl font-medium text-red-600`}>Page Not Found!</p>*/}
                <Image
                    className={`my-5`}
                    unoptimized
                    src={`/not-found.png`}
                    alt={`Not Found`}
                    width={350}
                    height={350}
                />
                <p className={`text-lg text-gray-700  text-center`}>
                    អូស! ទំព័រនេះហាក់ដូចជាមិនមាន។ កុំបារម្ភ អ្នកអាចត្រឡប់ទៅទំព័រដើម ហើយស្វែងរកបន្តទៀតបាន!
                </p>
                <Button
                    onClick={
                        () => router.push('/')
                    }
                    className={`bg-primary text-white w-[350px] `}>
                    ត្រឡប់ទៅទំព័រដើម
                </Button>
            </div>

        </div>
    );
}