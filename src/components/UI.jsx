import DownloadButton from "./DownloadButton.jsx";
import AssetsBox from "./AssetsBox.jsx";
import {useConfiguratorStore} from "../store.js";
import ColorPicker from "./ColorPicker.jsx";
import RandomizeButton from "./RandomizeButton.jsx";

const UI = () => {
  const currentCategory = useConfiguratorStore(state => state.currentCategory)
  const customization = useConfiguratorStore(state => state.customization)

  return (
    <main className="fixed z-10 inset-0 select-none pointer-events-none">
      <div className="mx-auto h-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-10">
          <a href="https://yannifraga.com/" className="pointer-events-auto">
            <img src="/images/logo.png" alt="Website logo" className="w-20"/>
          </a>
          <div className="flex items-center gap-3">
            <RandomizeButton/>
            <DownloadButton/>
          </div>
        </div>
        <div className="flex flex-col px-10">
          {currentCategory?.colorPalette && customization[currentCategory.name] && (
            <ColorPicker/>
          )}
          <AssetsBox/>
        </div>
      </div>
    </main>
  )
}

export default UI