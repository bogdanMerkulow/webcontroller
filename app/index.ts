class AppElement {

    element: HTMLInputElement

    constructor(element: HTMLInputElement) {
        this.element = element
    }

    setText(text: string): void {
        this.element.textContent = text
    }
}

enum Theme {
    DARK,
    LIGHT
}

class App {
    name: string = "Web Controller" + Math.random()
    document: Document
    
    constructor() {
        this.document = document
        this.document.title = this.name
    }
    
    changeTheme(theme: Theme): void {
        switch (theme) {
            case Theme.DARK:
                this.document.body.style.background = "#3d3d3d"
                break
            case Theme.LIGHT:
                this.document.body.style.background = "#fff"
                break
        }
    }
    
    getByClass(name: string): AppElement {
        return new AppElement(this.document.querySelector("." + name))
    }
}

const app: App = new App()

app.changeTheme(Theme.DARK)
app.getByClass("h1title").setText("123")