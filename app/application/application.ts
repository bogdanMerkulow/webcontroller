import {KeyMap} from "../controll/keymap"
import {Mouse} from "../controll/mouse"
import {AppElement} from "../elements/appelement"
import {ScrollableAppElement} from "../elements/scrollableappelement"
import {Colors, ColorsDark, ColorsLight} from "../models/colors";
import {Drawables, DrawablesDark, DrawablesLight} from "../models/drawable";
import {Theme} from "../models/theme"
import {Vector2} from "../models/vector2";

export abstract class Application {

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