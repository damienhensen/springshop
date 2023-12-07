import Image from "next/image";

import LoadingGif from "@/assets/image/loading.gif";

const Loading = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-10">
            <Image src={LoadingGif.src} alt="nuts" width={200} height={200} priority={true} />
        </div>
    )
}

export default Loading;