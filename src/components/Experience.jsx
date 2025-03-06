import {Backdrop, Environment, SoftShadows} from "@react-three/drei";
import Avatar from "./Avatar.jsx";
import CameraManager from "../CameraManager.jsx";

const Experience = () => {
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