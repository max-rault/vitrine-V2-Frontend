
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const publicURL = process.env.PUBLIC_URL || ``

const themes = {
  dark: `dark-theme.css`,
  light: `light-theme.css`,
};
console.log('fuck off 2 !!!!!')
render(
    <ThemeSwitcherProvider 
      themeMap={themes} 
      defaultTheme="light"
      // insertionPoint="styles-insertion-point"
    >
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeSwitcherProvider>,
    document.getElementById("root")
);