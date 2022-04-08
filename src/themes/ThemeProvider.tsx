import React, {createContext, useState} from "react"
import themes from "../themes/ThemeProvider.module.css"

const validThemes = Object.keys(themes)
const defaultTheme = "light"

type ThemeContext = {
  activeTheme: string
  changeTheme: (theme: string) => void
}

const defaultThemeContext: ThemeContext = {
  activeTheme: defaultTheme,
  changeTheme: () => undefined
}

export const ThemeContext = createContext<ThemeContext>(defaultThemeContext)

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState(defaultThemeContext.activeTheme)

  const changeTheme = (themeName: string): void => {
    if (validThemes.includes(themeName)) {
      setTheme(themeName)
    } else {
      setTheme(defaultTheme)
    }
  }

  const themeContext = {
    activeTheme: theme,
    changeTheme: changeTheme
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <div className={themes[theme]}>{props.children}</div>
    </ThemeContext.Provider>
  )
}
