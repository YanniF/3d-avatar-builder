import {pb, useConfiguratorStore} from "../store.js";
import {useEffect} from "react";

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    fetchCategories,
    setCurrentCategory,
    changeAsset,
    customization
  } = useConfiguratorStore()

  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <div
      className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
      <div className="flex items-center gap-8 pointer-events-auto no-scrollbar overflow-x-auto px-6 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b cursor-pointer ${
              currentCategory?.name === category.name
                ? "text-white shadow-purple-100 border-b-white"
                : "text-gray-300 hover:text-gray-100 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap px-6">
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto cursor-pointer hover:opacity-100 transition-all border-2 duration-500
              ${customization[currentCategory.name]?.asset?.id === asset.id ? 'border-white opacity-100' : 'opacity-80 border-transparent'}
            `}
          >
            <img
              src={pb.files.getURL(asset, asset.thumbnail)}
              className="object-cover w-full h-full"
              alt={asset.name}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AssetsBox;
