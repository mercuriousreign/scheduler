import { useState } from "react"

/**Hook for changing mode for individual appointment item in the list */
export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history,setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    
    setMode(mode);
    if (replace){
      history.pop();
    }
    setHistory([...history,mode]);
  }

  function back() {
    if (history.length>0) {
      history.pop();
    }
    
    if (mode !== initial){
      setMode(history[history.length-1]);
    }
    
  }


  return {mode,transition,back};
}