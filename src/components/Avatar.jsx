import {useAnimations, useFBX, useGLTF} from '@react-three/drei'
import {Suspense, useEffect, useRef} from "react";
import {pb, useConfiguratorStore} from "../store.js";
import Asset from "./Asset.jsx";
import {GLTFExporter} from "three-stdlib";

const Avatar = (props) => {
  const group = useRef()

  const {nodes} = useGLTF('/models/Armature.glb')
  const {animations} = useGLTF('/models/Poses.glb')
  const {actions} = useAnimations(animations, group)
  const customization = useConfiguratorStore(state => state.customization)
  const setDownload = useConfiguratorStore(state => state.setDownload)

  useEffect(() => {
    actions['Idle']?.play()
  }, [actions]);

  useEffect(() => {
    const save = (blob, filename) => {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }

    const download = () => {
      const exporter = new GLTFExporter()

      exporter.parse(
        group.current,
        result => {
          save(new Blob([result], {type: 'application/octet-stream'}), `avatar-${new Date()}.glb`)
        },
        error => console.error(error),
        {binary: true}
      )
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);

    setDownload(download)
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips}/>
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.id}>
                  <Asset
                    categoryName={key}
                    url={pb.files.getURL(
                      customization[key].asset,
                      customization[key].asset.url
                    )}
                    skeleton={nodes.Plane.skeleton}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  )
}

export default Avatar;
