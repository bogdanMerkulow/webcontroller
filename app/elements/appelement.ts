export class AppElement {

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