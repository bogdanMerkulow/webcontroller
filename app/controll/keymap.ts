import {Buttons} from "../models/button"

export class KeyMap {

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