import { ReactNode } from "react"
import { MdClose } from "react-icons/md"

interface IProps {
    title?: string 
    open: boolean, 
    hideTitle?: boolean,
    handleClose: () => void,
    children: ReactNode,
}

const ModalWrapper = (props: IProps) => {

    const { title, open, handleClose, children } = props

    if (!open) return <></>

    return (
        <div className="fixed top-0 left-0 h-screen w-screen" style={{zIndex: 10 }}>

            <div className="fixed h-screen w-screen bg-slate-800 opacity-70"></div>

            <div className="fixed flex justify-center items-center h-screen w-screen">

                <div data-aos="slide-up" className="mx-4 bg-white rounded-lg w-full max-w-[500px] min-h-[150px]">

                    {
                       !props.hideTitle &&
                            <div className="flex justify-between border-b-[1px] pb-2 border-slate-200"> 
                                <h2 className="font-semibold text-lg pl-4 pt-2">{title}</h2> 
                                <button className="pr-4 pt-2" onClick={handleClose}><MdClose size={24} /></button>
                            </div>
                    }

                    <div className="p-4 overflow-y-auto">
                        {children}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ModalWrapper