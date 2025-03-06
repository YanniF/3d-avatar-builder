import {useConfiguratorStore} from "../store.js";

const DownloadButton = () => {
  const download = useConfiguratorStore(state => state.download)

  return (
    <button
      className="px-4 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300 text-white font-medium cursor-pointer pointer-events-auto"
      onClick={download}
    >
      Download
    </button>
  )
}

export default DownloadButton
