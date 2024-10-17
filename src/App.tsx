import { useLayoutEffect, useRef } from "react";
import {
  AppAnimationRunner,
  Timeout,
  SlideInAnimation,
  SequentialAnimationEngine,
} from "@lib/animation";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runner = useRef<AppAnimationRunner>();

  useLayoutEffect(() => {
    const canvasContext = canvasRef.current!.getContext("2d");

    if (!canvasContext) return;

    const timeline = [
      new Timeout({ duration: 500 }),
      new SlideInAnimation({ duration: 5_000 }),
      new Timeout({ duration: 2_000 }),
    ];
    runner.current = new AppAnimationRunner(
      SequentialAnimationEngine,
      timeline,
    );
  }, []);

  const handleRunnerStart = () => {
    const context = canvasRef.current!.getContext("2d");

    if (!context) return;

    const currentTimelineTime =
      typeof document.timeline.currentTime === "number"
        ? document.timeline.currentTime
        : 0;

    runner.current!.start(context, currentTimelineTime);
  };

  const handleRunnerStop = () => {
    const context = canvasRef.current!.getContext("2d");

    if (!context) return;

    runner.current!.stop();
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>

      <button onClick={handleRunnerStart}>Start</button>
      <button onClick={handleRunnerStop}>Stop</button>
    </div>
  );
}

export default App;
