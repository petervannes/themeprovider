import React, {useContext} from "react"
import styles from "./App.module.css"
import {ThemeContext} from "./themes/ThemeProvider"
import SwitchSelector from "react-switch-selector"

export function App(): JSX.Element {
  const {changeTheme} = useContext(ThemeContext)

  const options = [
    {
      label: "light",
      value: "light"
    },
    {
      label: "Dark",
      value: "dark"
    },
    {
      label: "High Contrast",
      value: "high-contrast"
    },
    {
      label: "Colorblind",
      value: "colorblind"
    }
  ]

  const onChange = (newValue:unknown) => {
    changeTheme(newValue as string)
  }

  const initialSelectedIndex = options.findIndex(({value}) => value === "bar")
  return (
    <div className={styles.container}>
      <h1>Themed CSS Modules</h1>
      <p>A simple demo how to apply themes in React using CSS Modules. </p>

      <div className={styles.switch}>
        <SwitchSelector
          onChange={onChange}
          options={options}
          initialSelectedIndex={initialSelectedIndex}
          backgroundColor={"#333333"}
          selectedBackgroundColor={"#eeeeee"}
          selectedFontColor={"#333333"}
          fontColor={"#f5f6fa"}
          fontSize={20}
          optionBorderRadius={20}
        />
      </div>
      <div className={styles.democontainer}>
        <a className={styles.button}>Button</a>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Pellentesque pulvinar pellentesque habitant morbi tristique. Sed
          turpis tincidunt id aliquet risus feugiat in ante. Libero nunc
          consequat interdum varius. Amet nulla facilisi morbi tempus iaculis
          urna id volutpat lacus. Integer malesuada nunc vel risus commodo
          viverra maecenas accumsan. Leo integer malesuada nunc vel risus. In
          arcu cursus euismod quis viverra nibh. Pretium quam vulputate
          dignissim suspendisse in est ante. Lacinia quis vel eros donec ac
          odio. Sit amet consectetur adipiscing elit duis tristique sollicitudin
          nibh. Non curabitur gravida arcu ac tortor dignissim convallis aenean
          et.
        </p>
      </div>
    </div>
  )
}
