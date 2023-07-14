import {MouseDirection} from "../models/mousedirection"
import {Vector2} from "../models/vector2"

export class Mouse {

    private static MAX_PERCENT: number = 100
    private static MAX_SCROLL_DIVIDER: number = 2

    private static FAST_LIMIT: number = 50
    private static SLOW_LIMIT: number = 0
    private static REVERSE_FAST_LIMIT: number = -50

    public moveMouse(position: Vector2, maxScroll: Vector2, scrollCenterPosition: Vector2): void {
        let xOffset: number = position.x - scrollCenterPosition.x
        let yOffset: number = position.y - scrollCenterPosition.y

        let xOffsetPercent: number = Math.floor((xOffset * Mouse.MAX_PERCENT) / (maxScroll.x / Mouse.MAX_SCROLL_DIVIDER))
        let yOffsetPercent = Math.floor((yOffset * Mouse.MAX_PERCENT) / (maxScroll.y / Mouse.MAX_SCROLL_DIVIDER))

        if (xOffsetPercent > Mouse.FAST_LIMIT) {
            this.move(MouseDirection.LEFT_FAST)
        } else if (xOffsetPercent > Mouse.SLOW_LIMIT) {
            this.move(MouseDirection.LEFT)
        } else if (xOffsetPercent < Mouse.REVERSE_FAST_LIMIT) {
            this.move(MouseDirection.RIGHT_FAST)
        } else if (xOffsetPercent < Mouse.SLOW_LIMIT) {
            this.move(MouseDirection.RIGHT)
        }

        if (yOffsetPercent > Mouse.FAST_LIMIT) {
            this.move(MouseDirection.UP_FAST)
        } else if (yOffsetPercent > Mouse.SLOW_LIMIT) {
            this.move(MouseDirection.UP)
        } else if (yOffsetPercent < Mouse.REVERSE_FAST_LIMIT) {
            this.move(MouseDirection.DOWN_FAST)
        } else if (yOffsetPercent < Mouse.SLOW_LIMIT) {
            this.move(MouseDirection.DOWN)
        }
    }

    private move(direction: MouseDirection): void {
        console.log(direction)
    }
}