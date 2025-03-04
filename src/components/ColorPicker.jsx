import {useConfiguratorStore} from "../store.js";

const ColorPicker = () => {
  const updateColor = useConfiguratorStore(state => state.updateColor)
  const currentCategory = useConfiguratorStore(state => state.currentCategory)
  const customization = useConfiguratorStore(state => state.customization)

  if (!customization[currentCategory.name]) {
    return null
  }

  return (
    <div
      className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
      {currentCategory.expand?.colorPalette?.colors.map((color, index) => (
        <button
          key={`${index}-${color}`}
          className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2
             ${customization[currentCategory.name].color === color
            ? "border-white"
            : "border-transparent"
          }
          `}
          onClick={() => updateColor(color)}
        >
          <div className="w-full h-full rounded-md" style={{backgroundColor: color}}/>
        </button>
      ))}
    </div>
  )
}

export default ColorPicker