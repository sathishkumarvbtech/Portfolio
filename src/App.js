import { useEffect, useState } from 'react';
import Circle from './components/Circle';
import Layout from './components/Layout';
import Preloader from './components/Preloader';

function App() {


  const [isLoading, setLoading] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });
  }

  return (
    <div>
      {
        isLoading ? <Preloader /> :
          <div onMouseMove={handleMouseMove}>
            <Circle x={position.x} y={position.y} />
            <Layout />
          </div>
      }
    </div>
  );
}

export default App;
