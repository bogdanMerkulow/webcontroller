class AppElement {

    private element: HTMLInputElement

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
        this.element.addEventListener("click", () => listener(this.getText()));
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

class Drawables {
    public CHANGE_THEME_BUTTON: string
}

class DrawablesLight extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/night.png')"
}

class DrawablesDark extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/day.png')"
}

class Application {

    private static NAME: string = "Web Controller"

    private keymap: KeyMap = new KeyMap()
    private document: Document
    private theme: Theme = Theme.DARK
    private initColorsCallBack: () => void

    public constructor() {
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

    private changeTheme(theme: Theme): void {
        this.theme = theme
        this.initColorsCallBack()
    }

    public getByClass(name: string): AppElement {
        return new AppElement(this.document.querySelector("." + name))
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
}

const application: Application = new Application()

application.initColors(() => {
    application.getByClass("touchpad_button").setBackgroundColor(application.getColors().ACCENT)
    application.getAllByType("button").map((button) => {
        button.setBackgroundColor(application.getColors().SECONDARY)
        button.setTextColor(application.getColors().PRIMARY_TEXT)
        button.setOnClickListener((text) => application.invokeKeyMap(text))
    })
    application.getByClass("theme_button").setBackgroundImage(application.getDrawables().CHANGE_THEME_BUTTON)
    application.getByClass("touchpad").setBackgroundColor(application.getColors().SECONDARY)
})

application.getByClass("theme_button").setOnClickListener(() => application.nextTheme())
