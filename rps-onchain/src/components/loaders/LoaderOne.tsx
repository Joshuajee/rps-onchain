import { LineWave } from "react-loader-spinner"

const LoaderOne = () => {

    return (
        <div className="flex justify-center items-center w-full h-full">

            <LineWave
                height="100"
                width="100"
                color="#FB8500"
                ariaLabel="line-wave"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""/>

        </div>
    )
}

export default LoaderOne