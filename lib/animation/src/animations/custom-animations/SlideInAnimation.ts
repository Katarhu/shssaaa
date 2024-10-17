import {
  TimelineAnimation,
  TimelineItemProps,
} from "lib/animation/src/animations/models";
import { BaseTimelineItem } from "../BaseTimelineItem";

export class SlideInAnimation
  extends BaseTimelineItem
  implements TimelineAnimation
{
  constructor({ duration }: TimelineItemProps) {
    super(duration);
  }

  proceed(context: CanvasRenderingContext2D, timestamp: number): void {
    this.calculateRemainingDuration(timestamp);
    // context.strokeStyle = '#000000';
    // context.fillRect(0, 0, 300, 150);
    context.clearRect(0, 0, 300, 150);

    context.strokeStyle = "#000000";
    context.fillRect((this._elapsed / 10), 20, 30, 30);
  }

  stop(context: CanvasRenderingContext2D): void {
    console.log(context);
  }

  get completed(): boolean {
    return this._completed;
  }
}
