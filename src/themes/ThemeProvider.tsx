import React, {createContext, Fragment, useContext, useState} from "react"
import themes from "../themes/themes.module.css"

const validThemes = Object.keys(themes)
const defaultTheme = "light"

type ThemeContext = {
  visualTheme: string
  changeTheme: (theme: string) => void
}

const defaultThemeContext: ThemeContext = {
  visualTheme: defaultTheme,
  changeTheme: () => undefined
}

export const ThemeContext = createContext<ThemeContext>(defaultThemeContext)

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState(defaultThemeContext.visualTheme)

  const changeTheme = (themeName: string): void => {
    if (validThemes.includes(themeName)) {
      setTheme(themeName)
    } else {
      setTheme(defaultTheme)
    }
  }

  const themeContext = {
    visualTheme: theme,
    changeTheme: changeTheme
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <div className={themes[theme]}>{props.children}</div>
    </ThemeContext.Provider>
  )
}
