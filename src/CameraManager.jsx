import {useEffect, useRef} from "react";
import {CameraControls} from "@react-three/drei";
import {button, useControls} from "leva";
import {useConfiguratorStore} from "./store.js";

export const defaultCameraPosition = [-1, 1, 5]
export const defaultCameraTarget = [0, 0, 0]

const CameraManager = () => {
  const controls = useRef()
  const currentCategory = useConfiguratorStore(state => state.currentCategory)

  useControls({
    getCameraPosition: button(() => {
      console.log('Camera Position', [...controls.current.getPosition()]);
    }),
    getCameraTarget: button(() => {
      console.log('Camera Target', [...controls.current.getTarget()]);
    }),
  });

  useEffect(() => {
    if (currentCategory?.expand?.cameraPlacement) {
      controls.current.setLookAt(
        ...currentCategory.expand.cameraPlacement.position,
        ...currentCategory.expand.cameraPlacement.target,
        true
      )
    } else {
      controls.current.setLookAt(
        ...defaultCameraPosition,
        ...defaultCameraTarget,
        true
      )
    }
  }, [currentCategory]);

  return (
    <CameraControls
      ref={controls}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={8}
    />
  )
}

export default CameraManager;
