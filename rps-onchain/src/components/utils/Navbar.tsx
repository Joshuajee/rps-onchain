import Link from "next/link"
import { useScroll } from "@/hooks/windows"
import { ROUTES } from "@/libs/enums"
import Connection from "@/components/connection"

const navs = [
    { name: "Leaderboard", link: ROUTES.SWAP},
    { name: "", link: ROUTES.POOLS},
    { name: "Faucets", link: ROUTES.FAUCETS}
]

const Navbar = () => {

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <nav className={`${trigger && "shadow-lg backdrop-blur-xl bg-blue/50 z-10"} fixed w-full flex justify-between py-4 px-2 md:px-10`}>

            <Link href={"/"} className="text-gray-800  font-bold text-md md:text-2xl">RPS-onchain</Link>

            {/* <ul className="flex items-center text-[#8892B0] text-xs">

                {
                    navs.map((nav, index) => {
                        return (
                            <li data-aos-delay={Number(index) * 100} data-aos="fade-down" className="mx-2 md:mx-4" key={index}>
                                <Link href={`${nav.link}`}>
                                    {nav.name} 
                                </Link>
                            </li>
                        )
                    })

                }

            </ul> */}

            <Connection />

        </nav>
    )
}

export default Navbar