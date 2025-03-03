import {Canvas} from "@react-three/fiber";
import UI from "./components/UI.jsx";
import Experience from "./components/Experience.jsx";

function App() {
  return (
    <>
      <UI/>
      <Canvas
        camera={{
          position: [-1, 1, 5],
          fov: 45
        }}
        shadows={true}
      >
        <color attach="background" args={['#555']}/>
        <fog attach="fog" args={["#555", 15, 25]}/>
        <group position-y={-1}>
          <Experience/>
        </group>
      </Canvas>
    </>

  )
}

export default App
// https://www.youtube.com/watch?v=yA4BpGqT3-s&ab_channel=WawaSensei