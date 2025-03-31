'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NoInternetPage() {
    const router = useRouter();

    const handleRetry = () => {
        if (navigator.onLine) {
            router.refresh(); // Refresh the page if internet is back
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="text-start max-w-[350px] space-y-5">
                <div className={` w-full flex justify-center`}>
                    <Image
                        className="my-5 text-center"
                        unoptimized
                        src="/no-internet.png" // Ensure this image exists in /public
                        alt="No Internet"
                        width={300}
                        height={300}
                    />
                </div>
                <p className="text-lg text-gray-700 text-center">
                    អូស! អ្នកហាក់ដូចជាគ្មានអ៊ីនធឺណិតទេ។ សូមពិនិត្យការតភ្ជាប់របស់អ្នក ហើយព្យាយាមម្តងទៀត!
                </p>
                <Button
                    onClick={handleRetry}
                    className="bg-primary text-white w-[350px]"
                >
                    ព្យាយាមម្តងទៀត
                </Button>
            </div>
        </div>
    );
}