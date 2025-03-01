import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import UI from "./components/UI.jsx";

function App() {
  return (
     <>
       <UI />
       <Canvas
          camera={{ position: [3, 3, 3] }}
       >
         <color attach="background" args={['#333']} />
         <OrbitControls />
         <mesh>
           <boxGeometry args={[.5, .5, .5]} />
           <meshNormalMaterial />
         </mesh>
       </Canvas>
     </>

  )
}

export default App
// https://www.youtube.com/watch?v=yA4BpGqT3-s&ab_channel=WawaSensei