import Link from "next/link"
import { useScroll } from "@/hooks/windows"
import Connection from "@/components/connection"


const Navbar = () => {

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <nav data-aos="fade-in" className={`${trigger && "shadow-lg backdrop-blur-xl bg-blue/50 z-10"} fixed w-full flex justify-between py-4 px-2 md:px-10`}>

            <Link href={"/"} className="text-gray-800  font-bold text-sm md:text-2xl">RPS-onchain</Link>

            <Connection />

        </nav>
    )
}

export default Navbar