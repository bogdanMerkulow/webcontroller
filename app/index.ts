/***
 * REGION MODELS
 */

enum Theme {
    DARK,
    LIGHT
}

abstract class Colors {
    public PRIMARY_TEXT: string
    public SECONDARY_TEXT: string
    public PRIMARY: string
    public SECONDARY: string
    public ACCENT: string
    public BACKGROUND: string
}

class ColorsDark extends Colors {
    public PRIMARY_TEXT: string = "#fff"
    public SECONDARY_TEXT: string = "#999"
    public PRIMARY: string = "#393939"
    public SECONDARY: string = "#232323"
    public ACCENT: string = "#2eb4a4"
    public BACKGROUND: string = "#3d3d3d"
}

class ColorsLight extends Colors {
    public PRIMARY_TEXT: string = "#000"
    public SECONDARY_TEXT: string = "#555"
    public PRIMARY: string = "#ddd"
    public SECONDARY: string = "#cdcdcd"
    public ACCENT: string = "#3AE2CE"
    public BACKGROUND: string = "#fff"
}

abstract class Drawables {
    public CHANGE_THEME_BUTTON: string
}

class DrawablesLight extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/night.png')"
}

class DrawablesDark extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/day.png')"
}

class Vector2 {
    x: number
    y: number

    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

enum Buttons {
    ESC = "ESC",
    SPACE = "SPACE",
    ENTER = "ENTER",
    F = "F",
    LEFT_ARROW = "←",
    RIGHT_ARROW = "→",
    UP_ARROW = "↑",
    DOWN_ARROW = "↓",
    LMB = "LMB",
    RMB = "RMB"
}

enum MouseDirection {
    UP = "UP",
    UP_FAST = "UP_FAST",
    DOWN = "DOWN",
    DOWN_FAST = "DOWN_FAST",
    LEFT = "LEFT",
    LEFT_FAST = "LEFT_FAST",
    RIGHT = "RIGHT",
    RIGHT_FAST = "RIGHT_FAST"
}

/***
 * END MODELS
 */

class AppElement {

    protected element: HTMLInputElement
    private static CLICK_EVENT = "click"

    public constructor(element: HTMLInputElement) {
        this.element = element
    }

    public setText(text: string): void {
        this.element.textContent = text
    }

    public getText(): string {
        return this.element.textContent
    }

    public setTextColor(color: string): void {
        this.element.style.color = color
    }

    public setBackgroundColor(color: string): void {
        this.element.style.backgroundColor = color
    }

    public setBackgroundImage(drawable: string): void {
        this.element.style.backgroundImage = drawable
    }

    public setOnClickListener(listener: (text: string) => void): void {
        this.element.addEventListener(AppElement.CLICK_EVENT, () => listener(this.getText()));
    }
}

class ScrollableAppElement extends AppElement {

    private static SCROLL_EVENT: string = "scroll"
    private static TOUCH_END_EVENT = "touchend"

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
        this.element.addEventListener(ScrollableAppElement.SCROLL_EVENT, e => {
            // @ts-ignore
            let x: number = event.originalTarget.scrollLeft
            // @ts-ignore
            let y: number = event.originalTarget.scrollTop

            listener(new Vector2(x, y))
        })
    }

    public setUntouchListener(listener: () => void): void {
        this.element.addEventListener(ScrollableAppElement.TOUCH_END_EVENT, e => {
            listener()
        })
    }
}

class KeyMap {

    public onClick(button: string): void {
        switch (button) {
            case Buttons.ESC:
                this.onEscClick()
                break
            case Buttons.SPACE:
                this.onSpaceClick()
                break
            case Buttons.ENTER:
                this.onEnterClick()
                break
            case Buttons.F:
                this.onFClick()
                break
            case Buttons.LEFT_ARROW:
                this.onLeftClick()
                break
            case Buttons.RIGHT_ARROW:
                this.onRightClick()
                break
            case Buttons.UP_ARROW:
                this.onUpClick()
                break
            case Buttons.DOWN_ARROW:
                this.onDownClick()
                break
            case Buttons.LMB:
                this.onLMBClick()
                break
            case Buttons.RMB:
                this.onRMBClick()
                break
        }
    }

    private onEscClick(): void {
        console.log(Buttons.ESC)
    }

    private onSpaceClick(): void {
        console.log(Buttons.SPACE)
    }

    private onEnterClick(): void {
        console.log(Buttons.ENTER)
    }

    private onFClick(): void {
        console.log(Buttons.F)
    }

    private onLeftClick(): void {
        console.log(Buttons.LEFT_ARROW)
    }

    private onRightClick(): void {
        console.log(Buttons.RIGHT_ARROW)
    }

    private onUpClick(): void {
        console.log(Buttons.UP_ARROW)
    }

    private onDownClick(): void {
        console.log(Buttons.DOWN_ARROW)
    }

    private onLMBClick(): void {
        console.log(Buttons.LMB)
    }

    private onRMBClick(): void {
        console.log(Buttons.RMB)
    }
}

class Mouse {

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

abstract class Application {

    private static NAME: string = "Web Controller"

    private keymap: KeyMap = new KeyMap()
    private mouse: Mouse = new Mouse()
    private document: Document
    private theme: Theme = Theme.DARK
    private initColorsCallBack: () => void

    protected constructor() {
        this.document = document
        this.document.title = Application.NAME
    }

    public nextTheme(): void {
        if (this.theme == Theme.DARK) {
            this.theme = Theme.LIGHT
            this.changeTheme(Theme.LIGHT)
        } else {
            this.theme = Theme.DARK
            this.changeTheme(Theme.DARK)
        }
    }

    public changeTheme(theme: Theme): void {
        this.theme = theme
        this.initColorsCallBack()
    }

    public getByClass(name: string): AppElement {
        return new AppElement(this.document.querySelector("." + name))
    }

    public getScrollableByClass(name: string): ScrollableAppElement {
        return new ScrollableAppElement(this.document.querySelector("." + name))
    }

    public getAllByType(name: string): Array<AppElement> {
        let elements = this.document.querySelectorAll(name)
        let appElements: Array<AppElement> = []

        elements.forEach((element: HTMLInputElement) => {
            appElements.push(new AppElement(element))
        })

        return appElements
    }

    public getColors(): Colors {
        let colors: Colors
        if (this.theme === Theme.DARK) {
            colors = new ColorsDark()
        } else {
            colors = new ColorsLight()
        }

        return colors
    }

    public getDrawables(): Drawables {
        let drawables: Drawables
        if (this.theme === Theme.DARK) {
            drawables = new DrawablesDark()
        } else {
            drawables = new DrawablesLight()
        }

        return drawables
    }

    public initColors(callBack: () => void): void {
        this.initColorsCallBack = () => {
            callBack()
            this.document.body.style.backgroundColor = this.getColors().BACKGROUND
        }
        this.initColorsCallBack()
    }

    public invokeKeyMap(button: string): void {
        this.keymap.onClick(button)
    }

    public moveMouse(position: Vector2, maxScroll: Vector2, scrollCenterPosition: Vector2): void {
        this.mouse.moveMouse(position, maxScroll, scrollCenterPosition)
    }
}

class AppDelegate extends Application {

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
        this.application.getByClass("touchpad_button").setBackgroundColor(this.application.getColors().ACCENT)
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

new AppDelegate().main()
