import {Canvas} from "@react-three/fiber";
import UI from "./components/UI.jsx";
import Experience from "./components/Experience.jsx";
import {defaultCameraPosition} from "./CameraManager.jsx";
import {Leva} from "leva";

function App() {
  return (
    <>
      <Leva hidden/>
      <UI/>
      <Canvas
        camera={{
          position: defaultCameraPosition,
          fov: 45
        }}
        gl={{preserveDrawingBuffer: true}}
        shadows={true}
      >
        <color attach="background" args={['#130f30']}/>
        <fog attach="fog" args={['#130f30', 10, 40]}/>
        <group position-y={-1}>
          <Experience/>
        </group>
      </Canvas>
    </>

  )
}

export default App
// https://www.youtube.com/watch?v=yA4BpGqT3-s&ab_channel=WawaSensei