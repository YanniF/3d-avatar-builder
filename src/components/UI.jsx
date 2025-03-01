import DownloadButton from "./DownloadButton.jsx";
import AssetsBox from "./AssetsBox.jsx";

const UI = () => {
  return (
     <main className="fixed z-10 inset-0 p-10 pointer-events-none">
       <div className="mx-auto h-full flex flex-col justify-between">
         <div className="flex justify-between items-center">
           <a href="https://yannifraga.com/" className="pointer-events-auto">
             <img src="/images/logo.png" alt="Website logo" className="w-20" />
           </a>
           <DownloadButton />
         </div>
         <div className="flex flex-col gap-6">
           <AssetsBox />
         </div>
       </div>
     </main>
  )
}

export default UI