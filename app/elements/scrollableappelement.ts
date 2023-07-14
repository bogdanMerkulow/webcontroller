import {AppElement} from "./appelement";
import {Vector2} from "../models/vector2";

export class ScrollableAppElement extends AppElement {

    private static SCROLL_EVENT: string = "scroll"
    private static TOUCH_END_EVENT: string = "touchend"
    private static ORIGINAL_TARGET: string = "originalTarget"
    private static SCROLL_LEFT: string = "scrollLeft"
    private static SCROLL_TOP: string = "scrollTop"

    public getMaxScroll(): Vector2 {
        // @ts-ignore
        let x: number = this.element.scrollLeftMax
        // @ts-ignore
        let y: number = this.element.scrollTopMax

        return new Vector2(y, y)
    }

    public scrollTo(x: number, y: number): void {
        this.element.scrollTo(x, y)
    }

    public scrollToCenter(): void {
        let maxScroll: Vector2 = this.getMaxScroll()
        this.element.scrollTo(maxScroll.x / 2, maxScroll.y / 2)
    }

    public getScrollCenterPosition(): Vector2 {
        let maxScroll: Vector2 = this.getMaxScroll()
        return new Vector2(maxScroll.x / 2, maxScroll.y / 2)
    }

    public setScrollListener(listener: (position: Vector2) => void): void {
        this.element.addEventListener(ScrollableAppElement.SCROLL_EVENT, event => {
            let x: number = event[ScrollableAppElement.ORIGINAL_TARGET][ScrollableAppElement.SCROLL_LEFT]
            let y: number = event[ScrollableAppElement.ORIGINAL_TARGET][ScrollableAppElement.SCROLL_TOP]

            listener(new Vector2(x, y))
        })
    }

    public setUntouchListener(listener: () => void): void {
        this.element.addEventListener(ScrollableAppElement.TOUCH_END_EVENT, e => {
            listener()
        })
    }
}