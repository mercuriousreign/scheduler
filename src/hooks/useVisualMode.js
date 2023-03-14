import { useState } from "react"

/**Hook for changing mode for individual appointment item in the list */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    setMode(newMode);
    if (replace) {
      newMode = history[history.length - 1];
    } else {
      history.push(newMode);
    }
    setHistory([...history]);
  }

  function back() {

    if (history.length > 1) {
      let oldHistory = [...history];
      oldHistory.pop();
      setMode(oldHistory[oldHistory.length - 1]);
      setHistory([...oldHistory]);
    }

  }

  return { mode, transition, back };
}