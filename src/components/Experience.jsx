import {Environment, SoftShadows} from "@react-three/drei";
import Avatar from "./Avatar.jsx";
import CameraManager from "../CameraManager.jsx";
import {useConfiguratorStore} from "../store.js";
import {useEffect} from "react";
import {useThree} from "@react-three/fiber";

const Experience = () => {
  const setScreenshot = useConfiguratorStore(state => state.setScreenshot);
  const gl = useThree(state => state.gl)

  useEffect(() => {
    const takeScreenshot = () => {
      // new canvas with the same dimensions to "normal" canvas to be used to add elements to the screenshot
      const overlayCanvas = document.createElement("canvas");

      overlayCanvas.width = gl.domElement.width
      overlayCanvas.height = gl.domElement.height

      const overlayContext = overlayCanvas.getContext("2d");

      if (!overlayContext) {
        return
      }

      // draw the original rendered image onto the new canvas
      overlayContext.drawImage(gl.domElement, 0, 0)

      // create logo
      const logo = new Image();
      logo.src = '/images/logo.png';
      logo.crossOrigin = 'anonymous';
      logo.onload = () => {
        // draw logo
        const logoWidth = 240
        const logoHeight = 135
        const x = overlayCanvas.width - logoWidth - 42 // logo position
        const y = overlayCanvas.height - logoHeight - 42
        overlayContext.drawImage(logo, x, y, logoWidth, logoHeight)

        // create link to download the image
        const link = document.createElement('a')
        const date = new Date()
        link.setAttribute(
          'download',
          `Avatar_${date.toISOString().split('T')[0]}_${date.toLocaleTimeString()}.png`
        )
        link.setAttribute(
          'href',
          overlayCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        );
        link.click();
      }
    }

    setScreenshot(takeScreenshot);
  }, [gl]);

  return (
    <>
      <CameraManager/>

      <Environment preset="sunset" environmentIntensity={0.3}/>

      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]}/>
        <meshStandardMaterial color="#333" roughness={0.85}/>
      </mesh>
      <SoftShadows size={52} samples={16} focus={0.5}/>

      {/* key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* fill light */}
      <directionalLight position={[-5, 5, 5]} intensity={0.7}/>

      {/* backlights */}
      <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"}/>
      <directionalLight
        position={[-3, 3, -5]}
        intensity={8}
        color={"#3cb1ff"}
      />
      <Avatar/>
    </>
  )
}

export default Experience;