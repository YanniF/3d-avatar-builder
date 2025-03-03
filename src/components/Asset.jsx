import {useGLTF} from "@react-three/drei";
import {useMemo} from "react";

const Asset = ({url, categoryName, skeleton}) => {
  const {scene} = useGLTF(url)
  const attachedItems = useMemo(() => {
    const items = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material,
        });
      }
    });
    return items;
  }, [scene]);

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={'assets-' + index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      castShadow
      receiveShadow
    />
  ));
}

export default Asset