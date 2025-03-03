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
    <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl drop-shadow-md">
      <div className="flex items-center gap-6 pointer-events-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium cursor-pointer ${currentCategory.id === category.id ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-2 duration-500
              ${customization[currentCategory.name]?.asset?.id === asset.id ? 'border-indigo-600 opacity-100' : 'opacity-80 border-transparent'}
            `}
          >
            <img src={pb.files.getURL(asset, asset.thumbnail)} alt={asset.name}/>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AssetsBox;
