import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history,setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    console.log(mode);
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
    
    if (mode != initial){
      setMode(history[history.length-1]);
    }
    
    //setHistory(history);
    //console.log(history);
  
  }




  return {mode,transition,back};
}