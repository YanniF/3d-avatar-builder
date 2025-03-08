import {pb, useConfiguratorStore} from "../store.js";
import {useEffect} from "react";

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    fetchCategories,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups
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
      {lockedGroups[currentCategory?.name] && (
        <p className="px-6 text-red-400">
          Asset is hidden by{' '}
          {lockedGroups[currentCategory.name]
            .map(asset => `${asset.name} (${asset.categoryName})`)
            .join(', ')
          }
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto px-6">
        {currentCategory?.removable && (
          <button
            onClick={() => changeAsset(currentCategory.name, null)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr cursor-pointer
                ${!customization[currentCategory.name]?.asset ? 'border-white from-white/20 to-white/30' : 'from-black/70 to-black/20 border-black'}
              `}
          >
            <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        )}
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr cursor-pointer
              ${
              customization[currentCategory.name]?.asset?.id === asset.id
                ? "border-white from-white/20 to-white/30"
                : "from-black/70 to-black/20 border-black"
            }`}
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
