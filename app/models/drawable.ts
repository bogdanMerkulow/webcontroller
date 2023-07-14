abstract class Drawables {
    public CHANGE_THEME_BUTTON: string
}

class DrawablesLight extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/night.png')"
}

class DrawablesDark extends Drawables {
    public CHANGE_THEME_BUTTON: string = "url('res/drawable/day.png')"
}

export {Drawables, DrawablesDark, DrawablesLight}