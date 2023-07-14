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

export {Colors, ColorsDark, ColorsLight}