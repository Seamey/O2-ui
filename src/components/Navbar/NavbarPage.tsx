"use client";
import {useGetUserQuery} from "@/app/redux/service/user";
import {Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

import {setAccessToken} from "@/app/redux/features/auth/authSlice";
import {useAppDispatch} from "@/app/redux/hooks";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "../ProductDetail/Cart/Cart";
import SkeletonNavbar from "@/components/Navbar/Skeletonnavbar";

const navLinks = [
    {
        href: "/setting",
        label: "ការកំណត់",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings text-gray-500"
            >
                <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        ),
    },
    {
        href: "/purchase-history",
        label: "ប្រវត្តិនៃការទិញ",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-history text-gray-500"
            >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M12 7v5l4 2"/>
            </svg>
        ),
    },
    {
        href: "/bookmark",
        label: "ការរក្សាទុក",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-folder-clock text-gray-500"
            >
                <circle cx="16" cy="16" r="6"/>
                <path
                    d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"/>
                <path d="M16 14v2l1 1"/>
            </svg>
        ),
    },
    {
        href: "/cart",
        label: "កន្ត្រក",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-baggage-claim text-gray-500"
            >
                <path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"/>
                <path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"/>
                <rect width="13" height="8" x="8" y="6" rx="1"/>
                <circle cx="18" cy="20" r="2"/>
                <circle cx="9" cy="20" r="2"/>
            </svg>
        ),
    },
    {
        href: "/wishlist",
        label: "បញ្ជី",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-folder-heart text-gray-500"
            >
                <path
                    d="M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.5"/>
                <path
                    d="M13.9 17.45c-1.2-1.2-1.14-2.8-.2-3.73a2.43 2.43 0 0 1 3.44 0l.36.34.34-.34a2.43 2.43 0 0 1 3.45-.01c.95.95 1 2.53-.2 3.74L17.5 21Z"/>
            </svg>
        ),
    },
    {
        href: "/blog",
        label: "ប្លុក",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-video-2 text-gray-500"
            >
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <rect width="8" height="6" x="2" y="12" rx="1"/>
                <path d="m10 15.5 4 2.5v-6l-4 2.5"/>
            </svg>
        ),
    },
    {
        href: "/about-us",
        label: "អំពីយើង",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-round text-gray-500"
            >
                <path d="M18 21a8 8 0 0 0-16 0"/>
                <circle cx="10" cy="8" r="5"/>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
            </svg>
        ),
    },
    {
        href: "/privacy-policy",
        label: "Privacy & Policy",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-alert text-gray-500"
            >
                <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
            </svg>
        ),
    },
];

const navLinks_NoAccount = [
    {
        href: "/blog",
        label: "ប្លុក",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-video-2 text-gray-500"
            >
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <rect width="8" height="6" x="2" y="12" rx="1"/>
                <path d="m10 15.5 4 2.5v-6l-4 2.5"/>
            </svg>
        ),
    },
    {
        href: "/about-us",
        label: "អំពីយើង",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-round text-gray-500"
            >
                <path d="M18 21a8 8 0 0 0-16 0"/>
                <circle cx="10" cy="8" r="5"/>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
            </svg>
        ),
    },
    {
        href: "/privacy-policy",
        label: "Privacy & Policy",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-alert text-gray-500"
            >
                <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
            </svg>
        ),
    },
];

export default function NavbarPage() {
    const pathname = usePathname();
    const { data, isLoading } = useGetUserQuery();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const userAvatar = data?.data?.avatar;
    const userAvatarUrl = `${process.env.NEXT_PUBLIC_O2_API_URL}${userAvatar}`;
    const avatarUrl = userAvatar
        ? userAvatar.startsWith("http")
            ? userAvatar
            : userAvatarUrl.replace(/([^:])\/\/storage/, "$1/storage")
        : "/navbar/placeholder_user.png";

    const isLoggedIn = !!data?.data;

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                sidebarOpen &&
                !(event.target as HTMLElement).closest("#sidebar") &&
                !(event.target as HTMLElement).closest("#profile-avatar")
            ) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [sidebarOpen]);

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_O2_API_URL}api/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            if (response.ok) {
                dispatch(setAccessToken(null));
                localStorage.removeItem("access_token");
                router.push("/");
                router.refresh();
                window.location.reload();
            } else {
                console.error("Logout Failed");
            }
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const isRender = pathname === "/success-payment" || pathname === "/verify";

    return (
        isLoading ? (
            <SkeletonNavbar />
        ) : (
            <div className="sticky top-0 z-50">
                {!isRender ? (
                    <div className="w-full bg-white border-b border-b-slate-100">
                        <header className="flex items-center justify-between max-w-[95%] mx-auto p-2">
                            <Link href="/" className="w-[50px] h-[50px]">
                                <Image
                                    src="/navbar/logo.png"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                            <div className="flex space-x-5 items-center">
                                <Cart />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <div>
                                            <Menu className="cursor-pointer" size={27} />
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent className="bg-white w-[300px]">
                                        <SheetHeader>
                                            <SheetDescription>
                                                {isLoggedIn ? (
                                                    <div>
                                                        <SheetTitle className="text-xl flex justify-start font-normal">
                                                            ព័ត៌មានគណនី
                                                        </SheetTitle>
                                                        <div className="flex items-center justify-start space-x-3 mt-4">
                                                            <Image
                                                                src={avatarUrl}
                                                                alt="User Avatar"
                                                                unoptimized
                                                                width={45}
                                                                height={45}
                                                                className="rounded-full border-2 border-primary"
                                                            />
                                                            <div>
                                                                <div className="text-lg content-start text-start">
                                                                    {data?.data?.name || "User"}
                                                                </div>
                                                                <div className="text-sm text-description">
                                                                    {data?.data?.email || "Email"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <SheetTitle className="text-xl flex justify-start font-normal">
                                                            មិនមានគណនី
                                                        </SheetTitle>
                                                        <div className="flex justify-start space-x-2 items-center mt-4">
                                                            <Link href="/login" className="flex space-x-2 items-center">
                                                                <div>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="lucide lucide-user text-gray-500"
                                                                    >
                                                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                                        <circle cx="12" cy="7" r="4" />
                                                                    </svg>
                                                                </div>
                                                                <div className="text-lg text-gray-600">
                                                                    ចូលគណនី
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="mt-6 space-y-4">
                                                            {navLinks_NoAccount.map((link) => (
                                                                <Link
                                                                    key={link.href}
                                                                    href={link.href}
                                                                    className="flex items-center space-x-2 text-lg hover:text-green-700"
                                                                >
                                                                    <span>{link.icon}</span>
                                                                    <span className="text-gray-600 mt-1">
                                                                        {link.label}
                                                                    </span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </SheetDescription>
                                        </SheetHeader>
                                        {isLoggedIn && (
                                            <div className="mt-6 space-y-4">
                                                {navLinks.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        className="flex items-center space-x-2 text-lg hover:text-green-700"
                                                    >
                                                        <span>{link.icon}</span>
                                                        <span className="text-gray-600">{link.label}</span>
                                                    </Link>
                                                ))}
                                                <div
                                                    className="flex space-x-2 mt-6 cursor-pointer"
                                                    onClick={handleLogout}
                                                >
                                                    <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-log-out text-gray-500"
                                                        >
                                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                            <polyline points="16 17 21 12 16 7" />
                                                            <line x1="21" x2="9" y1="12" y2="12" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-lg text-red-700">ចាកចេញ</div>
                                                </div>
                                            </div>
                                        )}
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </header>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        )
    );
}