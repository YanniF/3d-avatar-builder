import {useConfiguratorStore} from "../store.js";
import {useEffect} from "react";

const AssetsBox = () => {
  const { categories, currentCategory, fetchCategories, setCurrentCategory } = useConfiguratorStore()

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
     </div>
  )
}

export default AssetsBox;