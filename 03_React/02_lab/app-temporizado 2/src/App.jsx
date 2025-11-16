import './App.less'

import Controles from './components/Controles'
import useTimer from './hooks/useTimer'


function App() {
  const { play, playControl, pauseControl, hour, minuts, seconds, resetControl } = useTimer()

  return (
    <>
      <Controles
        play={play}
        playControl={playControl}
        hour={hour}
        minuts={minuts}
        seconds={seconds}
        pauseControl={pauseControl}
        resetControl={resetControl} />
    </>
  )
}

export default App
