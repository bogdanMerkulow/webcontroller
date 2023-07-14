import {ScrollableAppElement} from "../elements/scrollableappelement";
import {Vector2} from "../models/vector2";
import {Application} from "./application";

export class AppDelegate extends Application {

    private application: Application

    constructor() {
        super();
        this.application = this
    }

    public main(): void {
        this.application.initColors(() => this.onInitColors())
        this.initTouchPad()
        this.setListeners()
    }

    private onInitColors(): void {
        this.application.getAllByType("button").map((button) => {
            button.setBackgroundColor(this.application.getColors().SECONDARY)
            button.setTextColor(this.application.getColors().PRIMARY_TEXT)
        })
        this.application.getByClass("touchpad_button").setBackgroundColor(this.application.getColors().SECONDARY)
        this.application.getByClass("theme_button").setBackgroundImage(this.application.getDrawables().CHANGE_THEME_BUTTON)
        this.application.getScrollableByClass("touchpad").setBackgroundColor(this.application.getColors().SECONDARY)
    }

    private setListeners(): void {
        this.application.getAllByType("button").map((button) => {
            button.setOnClickListener((text) => this.application.invokeKeyMap(text))
        })

        this.application.getByClass("theme_button").setOnClickListener(() => this.application.nextTheme())
    }

    private initTouchPad(): void {
        let touchpad: ScrollableAppElement = this.application.getScrollableByClass("touchpad")
        touchpad.scrollToCenter()

        let scrollCenterPosition: Vector2 = touchpad.getScrollCenterPosition()
        let maxScroll: Vector2 = touchpad.getMaxScroll()

        touchpad.setScrollListener((position) => {
            this.application.moveMouse(position, maxScroll, scrollCenterPosition)
        })

        touchpad.setUntouchListener(() => {
            touchpad.scrollToCenter()
        })
    }
}