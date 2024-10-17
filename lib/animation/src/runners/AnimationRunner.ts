import { AnimationEngine } from "@lib/animation/src/engines/models";
import { TimelineItem } from "@lib/animation/src/animations/models";

export class AppAnimationRunner {
  private _playing = true;
  private _animationEngine: AnimationEngine;
  private _leadingAnimationRequestId: number | null = null; 

  constructor(
    Ctor: new (timeline: TimelineItem[]) => AnimationEngine,
    timeline: TimelineItem[],
  ) {
    this._animationEngine = new Ctor(timeline);
  }

  start(context: CanvasRenderingContext2D, currentTimelineTime: number = 0) {
    this._playing = true;
    this.play(context, currentTimelineTime);
  }

  stop(): void {
    this._playing = false;
  }

  private play(context: CanvasRenderingContext2D, timestamp: number): void {
    if (!this._playing) {
      return cancelAnimationFrame(this._leadingAnimationRequestId as number);
    }

    this._animationEngine.play(context, timestamp);

    this._leadingAnimationRequestId = requestAnimationFrame((timestamp) => {
      this.play(context, timestamp);
    });
  }
}
