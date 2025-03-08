import {useEffect, useRef} from "react";
import {CameraControls} from "@react-three/drei";
import {button, useControls} from "leva";
import {useConfiguratorStore, UI_MODES} from "./store.js";

export const startCameraPosition = [500, 10, 1000]
export const defaultCameraPosition = [-1, 1, 5]
export const defaultCameraTarget = [0, 0, 0]

const CameraManager = () => {
  const controls = useRef()
  const currentCategory = useConfiguratorStore(state => state.currentCategory)
  const mode = useConfiguratorStore((state) => state.mode);
  const initialLoading = useConfiguratorStore(state => state.loading);

  useControls({
    getCameraPosition: button(() => {
      console.log('Camera Position', [...controls.current.getPosition()]);
    }),
    getCameraTarget: button(() => {
      console.log('Camera Target', [...controls.current.getTarget()]);
    }),
  });

  useEffect(() => {
    if (initialLoading) {
      controls.current.setLookAt(
        ...startCameraPosition,
        ...defaultCameraTarget
      )
    } else if (mode === UI_MODES.CUSTOMIZE && currentCategory?.expand?.cameraPlacement) {
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
  }, [currentCategory, mode, initialLoading]);

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
