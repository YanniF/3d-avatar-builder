import DownloadButton from "./DownloadButton.jsx";
import AssetsBox from "./AssetsBox.jsx";
import {UI_MODES, useConfiguratorStore} from "../store.js";
import ColorPicker from "./ColorPicker.jsx";
import RandomizeButton from "./RandomizeButton.jsx";
import PosesBox from "./PosesBox.jsx";
import ScreenshotButton from "./ScreenshotButton.jsx";

const UI = () => {
  const currentCategory = useConfiguratorStore(state => state.currentCategory)
  const customization = useConfiguratorStore(state => state.customization)
  const mode = useConfiguratorStore(state => state.mode)
  const setMode = useConfiguratorStore(state => state.setMode)
  const loading = useConfiguratorStore(state => state.loading)

  return (
    <main className="fixed z-10 inset-0 select-none pointer-events-none">
      <div
        className={`absolute inset-0 bg-gray-900 z-10 pointer-events-none flex items-center justify-center transition-opacity duration-1000
          ${loading ? 'opacity-100' : 'opacity-0'}
      `}>
        <img src="/images/logo.png" alt="Logo" className="w-60 animate-pulse"/>
      </div>
      <div className="mx-auto h-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-10">
          <a href="https://yannifraga.com/" className="pointer-events-auto">
            <img src="/images/logo.png" alt="Website logo" className="w-20 app-logo"/>
          </a>
          <div className="flex items-center gap-3">
            <RandomizeButton/>
            <ScreenshotButton/>
            <DownloadButton/>
          </div>
        </div>
        <div className="flex flex-col md:px-10">
          {mode === UI_MODES.CUSTOMIZE && (
            <>
              {currentCategory?.colorPalette && customization[currentCategory.name] && (
                <ColorPicker/>
              )}
              <AssetsBox/>
            </>
          )}
          {mode === UI_MODES.PHOTO && <PosesBox/>}
          <div className="flex justify-stretch">
            <button
              className={`flex-1 pointer-events-auto cursor-pointer p-4 text-white transition-colors duration-200 font-medium
                ${mode === UI_MODES.CUSTOMIZE
                ? "bg-indigo-500/90"
                : "bg-indigo-500/30 hover:bg-indigo-500/50"}
              `}
              onClick={() => setMode(UI_MODES.CUSTOMIZE)}
            >
              Customize avatar
            </button>
            <div className="w-px bg-white/30"></div>
            <button
              className={`flex-1 pointer-events-auto cursor-pointer p-4 text-white transition-colors duration-200 font-medium
                ${mode === UI_MODES.PHOTO
                ? "bg-indigo-500/90"
                : "bg-indigo-500/30 hover:bg-indigo-500/50"}
                `}
              onClick={() => setMode(UI_MODES.PHOTO)}
            >
              Photo booth
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UI