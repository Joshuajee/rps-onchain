import { ReactNode } from "react"
import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("./Navbar"), { ssr: false })
 
interface IProps {
    children: ReactNode
}

const Layout = (props: IProps) => {

    return (
        <main suppressHydrationWarning className={`flex flex-col h-full min-h-screen`}>
            <Navbar />

            <div className='flex-grow bg-slate-50'>{props.children}</div>
        </main>
    )
}

export default Layout