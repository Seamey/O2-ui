"use client";
import Image from "next/image"
import { Phone, Mail, Facebook, MapPin } from "lucide-react"
import Link from "next/link"
import { useContactUsMutation } from "@/app/redux/service/blog";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const [contact] = useContactUsMutation()

    // Local states for the contact form
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Form submission handler
    const handleContact = async () => {
        if (!username || !email || !message.trim()) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        setLoading(true);
        try {
            await contact({ name: username, email, message }).unwrap();
            setUsername("");
            setEmail("");
            setMessage("");
            toast.success("ការបញ្ចេញមតិយោបលរបស់អ្នកជោគជ័យ", {
                style: {
                    color: "white",
                    background: "#22bb33",
                },
            });
        } catch (error) {
            console.error("Failed to submit contact", error);
            toast.error("ការបញ្ចេញមតិយោបលរបស់អ្នកបរាជ័យ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                },
            });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
            {/* Main Content */}
            <main className="pb-4">
                {/* Hero Banner */}
                <div className="relative h-72 mb-4">
                    <Image
                        src="/assets/about-us.png"
                        alt="Vegetables and fruits"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center p-6 ">
                        <h1 className="text-primary font-semibold leading-[54px] text-3xl mb-4 text-center ">
                            ជាមួយពួកយើងលោកអ្នកអាចស្វែងរកគ្រប់ទំនិញដែលអ្នកចង់បាន ព្រមជាមួយគុណភាព
                        </h1>
                        <Link href="/privacy" className="bg-secondary text-white py-1.5 px-3 rounded-md w-24 text-center mx-auto">ឯកជនភាព</Link>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="px-4 mb-6">
                    <h2 className="text-blue-500 font-medium mb-10 text-2xl">គុណតម្លៃ៖</h2>
                    <div className="flex gap-6 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4">
                        {/* First Card */}
                        <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/teamwork.png" alt="សមធម៌ និងបរិយាបន្ន" width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-lg text-center mt-6">សមធម៌ និងបរិយាបន្ន</span>
                        </div>

                        {/* Second Card */}
                        <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/planet-earth.png" alt="ទីផ្សារ" width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-lg text-center mt-6">ចីរភាព</span>
                        </div>

                        {/* Third Card */}
                        <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/collaboration.png" alt="ការចូលរួម" width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-lg text-center mt-6">ការចូលរួម</span>
                        </div>

                        {/* Fourth Card */}
                        <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/integration.png" alt="សុចរិតភាព" width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-lg text-center mt-6">សុចរិតភាព</span>
                        </div>

                        {/* Fifth Card */}
                        <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/transparency.png" alt="តម្លាភាព" width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-lg text-center mt-6">តម្លាភាព</span>
                        </div>
                    </div>
                </div>


                {/* Information Sections */}
                <div className="px-4 mb-6">
                    <h2 className="text-blue-500 font-medium mb-8 text-2xl">ទស្សនវិស័យ៖</h2>
                    <p className="text-black/70 text-lg mb-6">
                        ជាការលើកកម្ពស់ប្រព័ន្ធកសិកម្មប្រកបដោយចីរភាពដែលផ្តល់ផលប្រយោជន៍ដល់កសិករ ពង្រឹងសន្តិសុខស្បៀង
                        ក្នុងការចូលរួមកាត់បន្ថយភាពក្រីក្រនិងការប្រែប្រួលអាកាសធាតុ ដើម្បីធានាបាននូវការអភិវឌ្ឍប្រកបដោយចីរភាពនិងសមធម៌សង្គម។
                    </p>

                    <h2 className="text-blue-500 font-medium mb-8 text-2xl">បេសកកម្ម៖</h2>
                    <p className="text-black/70 text-lg mb-6">
                        O2 បង្កើតប្រព័ន្ធកសិកម្មប្រកបដោយចីរភាពតាមរយៈការបណ្តុះបណ្តាល ស្រាវជ្រាវនិងអភិវឌ្ឍន៍បច្ចេកវិទ្យា ការផ្សព្វផ្សាយ
                        ពង្រឹងសមត្ថភាពនិងការតស៊ូមតិដើម្បីការ និងជួយដល់កសិករខ្នាតតូច។
                    </p>
                </div>

                {/* Organization Chart */}
                <div className="px-4 mb-6">
                    <Image
                        src="/assets/image.png"
                        alt="Organization chart"
                        width={400}
                        height={200}
                        className="w-full h-auto"
                    />
                </div>

                {/* Partners Section */}
                <div className="px-4 mb-6">
                    <h2 className="text-blue-500 font-medium mb-5 text-2xl">ទំនាក់ទំនងមកកាន់ពួកយើង៖</h2>
                    <div className="space-y-6">
                        {/* <label htmlFor="text">ឈ្មោះរបស់អ្នក</label> */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                            className="w-full p-4 text-sm rounded-lg mb-3   "
                        />
                        {/* <label htmlFor="enail">អ៊ីមែល</label> */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                            className="w-full p-4 text-sm rounded-lg"
                        />
                        {/* <label htmlFor="message" className="py-"> មតិយោបល</label> */}
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="មតិយោបលរបស់អ្នក..."
                            className=" text-sm rounded-lg p-4 w-full h-36"
                        />
                    </div>

                </div>

                {/* Contact Section */}
                <div className="px-4 mb-6">
                    <button onClick={handleContact}
                        disabled={loading}
                        className="bg-secondary text-white py-2.5 px-4 rounded-md mb-8 text-center w-full">{loading ? "កំពង់បញ្ចូន..." : "បញ្ជាក់ព័ត៌មានបន្ថែម"}</button>

                    <div className="space-y-3">
                        {/* Phone */}
                        <div className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-gray-600" />
                            <a href="tel:0987654213" className="text-gray-700 hover:text-blue-500 transition">
                                098 765 421 3
                            </a>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <Mail className="w-6 h-6 text-gray-600" />
                            <a href="mailto:camo2.info88@gmail.com" className="text-gray-700 hover:text-blue-500 transition">
                                camo2.info88@gmail.com
                            </a>
                        </div>

                        {/* Facebook */}
                        <div className="flex items-center gap-3">
                            <Facebook className="w-6 h-6 text-gray-600" />
                            <a href="https://facebook.O2/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition">
                                https://facebook.O2/
                            </a>
                        </div>

                        {/* Location (Google Maps) */}
                        <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-gray-600" />
                            <a href="https://www.google.com/maps/search/?api=1&query=Sangkat+Tonle+Bassac,+Khan+Chamkarmon,+Phnom+Penh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-500 transition">
                                Sangkat Tonle Bassac, Khan Chamkarmon Phnom Penh
                            </a>
                        </div>
                    </div>

                </div>

                {/* Map */}
                <div className="w-full h-36 mx-3 w-80">
                    <iframe src="https://www.google.com/maps/embed?pb=!4v1727062217787!6m8!1m7!1sVHp0enuXkiJTlB9z39M4zQ!2m2!1d11.55663474906035!2d104.8862034768563!3f357.8562378182402!4f2.568982036305343!5f0.9516337819776355" width="370" height="300" ></iframe>

                </div>
            </main>
        </div>
    )
}

