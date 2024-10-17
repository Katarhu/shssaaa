export class BaseTimelineItem {
  protected _completed = false;
  protected _elapsed = 0;
  private _frameTimeDelta: number | null = null;

  constructor(private readonly _duration: number) {}

  protected calculateRemainingDuration(timestamp: number) {
    if (this._frameTimeDelta === null) {
      this._frameTimeDelta = timestamp;
    }

    this._elapsed = timestamp - this._frameTimeDelta;

    // console.log((this._elapsed / 1000).toFixed(2));
    console.log(timestamp);

    if (this._elapsed >= this._duration) this._completed = true;
  }
}
