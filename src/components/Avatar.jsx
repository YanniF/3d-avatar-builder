import {useAnimations, useGLTF} from '@react-three/drei'
import {Suspense, useEffect, useRef} from "react";
import {pb, useConfiguratorStore} from "../store.js";
import {GLTFExporter} from "three-stdlib";
import {dedup, draco, prune, quantize} from "@gltf-transform/functions";
import Asset from "./Asset.jsx";
import {NodeIO} from "@gltf-transform/core";

const Avatar = (props) => {
  const group = useRef()

  const {nodes} = useGLTF('/models/Armature.glb')
  const {animations} = useGLTF('/models/Poses.glb')
  const {actions} = useAnimations(animations, group)

  const customization = useConfiguratorStore(state => state.customization)
  const setDownload = useConfiguratorStore(state => state.setDownload)
  const pose = useConfiguratorStore(state => state.pose)

  useEffect(() => {
    actions[pose]?.fadeIn(0.2).play();
    return () => actions[pose]?.fadeOut(0.2).stop();
  }, [actions, pose]);

  useEffect(() => {
    const save = (blob, filename) => {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }

    const download = () => {
      const exporter = new GLTFExporter();
      exporter.parse(
        group.current,
        async (result) => {
          const io = new NodeIO();
          const document = await io.readBinary(new Uint8Array(result)); // Uint8Array to Document

          await document.transform(
            prune(), // remove unused stuff (nodes, textures)
            dedup(), // remove duplicate vertex or texture data
            draco(),
            quantize()
          );

          const glb = await io.writeBinary(document); // Document → Uint8Array

          save(
            new Blob([glb], {type: 'application/octet-stream'}),
            `avatar_${+new Date()}.glb`
          );
        },
        (error) => {
          console.error(error);
        },
        {binary: true}
      );
    }

    const link = document.createElement('a');
    link.style.display = 'none'
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
