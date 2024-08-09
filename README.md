<h2 align='center'><samp>vite-plugin-env-color</samp></h2>

<p align='center'>Create a color file with your environment variables in <samp>Vite.js</samp></p>

<p align='center'>
  <a href='https://www.npmjs.com/package/vite-plugin-env-color'>
    <img src='https://img.shields.io/npm/v/vite-plugin-env-color?color=222&style=flat-square'>
  </a>
  <img src='https://img.shields.io/badge/license-MIT-blue.svg'>
</p>

<br>


## When? 🧐
Register color with ENV and use it when you want to make it into a Javascript or Css or Scss file.


## Installation 💻

Install the package as a development dependency:

```bash
npm i -D vite-plugin-env-color
# pnpm add -D vite-plugin-env-color
# yarn add -D vite-plugin-env-color
```

## Usage 🚀

You can provide a list of environment variable names to expose to your client code:

```js
import { defineConfig } from 'vite'
import VitePluginEnvColor from 'vite-plugin-env-color'

export default defineConfig({
  plugins: [
    VitePluginEnvColor(),
  ],
})
```

### Usage with default values 📌

```js
VitePluginEnvColor({
  // DEFAULT ENV FILTER NAME
  ENV_FILTER_NAME: 'VITE_COLOR',
  
  // DEFAULT ENV FILTER THEME NAME
  ENV_THEME_FILTER_NAME: 'VITE_THEME', 

  // DEFAULT ENV FILTER THEMES 
  ENV_THEME_COLOR_FILTER_NAMES: ['VITE_THEME_DARK', 'VITE_THEME_LIGHT'],

  // DEFAULT SCRIPT FILE NAME
  TS_FILE_NAME: 'color',  

  // DEFAULT SCRIPT PATH
  TS_BASE_PATH: './src',

  // DEFAULT CSS FILE NAME
  CSS_FILE_NAME: 'color',  

  // DEFAULT CSS PATH
  CSS_BASE_PATH: './public/css',

  // DEFAULT SCSS FILE NAME
  SCSS_FILE_NAME: 'color',

  // DEFAULT SCSS PATH
  SCSS_BASE_PATH: './src/assets',

  // BUILD JS
  IS_BUILD_JS: true,

  // BUILD SCSS
  IS_BUILD_SCSS: true,

  // BUILD CSS
  IS_BUILD_CSS: true,
}),
```

## Default Output Example ⚖️

#### ENV
```shell
VITE_COLOR_BLACK=000
VITE_COLOR_RED=F44336
VITE_COLOR_BLUE=0B5394
VITE_COLOR_GRAY=EEE
VITE_COLOR_WHITE_SMOKE=F5F5F5

VITE_THEME_DARK_RED=000
VITE_THEME_DARK_BLUE=EEE
VITE_THEME_DARK_SKY_BLUE=111

VITE_THEME_LIGHT_RED=333
VITE_THEME_LIGHT_BLUE=777
VITE_THEME_LIGHT_SKY_BLUE=EEE
```

#### Created Ts File 
```ts
// color
export type ColorType = 'black' |'red' |'blue' |'gray' |'whiteSmoke' ;
export type Color = Record<ColorType, string>;

// dark theme color
export type DarkColorType = 'red' |'blue' |'skyBlue' ;
export type DarkColor = Record<DarkColorType, string>;

// light theme color
export type LightColorType = 'red' |'blue' |'skyBlue' ;
export type LightColor = Record<LightColorType, string>;

export const color: Color = {
  black: '#000',
  red: '#F44336',
  blue: '#0B5394',
  gray: '#EEE',
  whiteSmoke: '#F5F5F5',
}
export const darkColor: DarkColor = {
  red: '#000',
  blue: '#EEE',
  skyBlue: '#111',
}
export const lightColor: LightColor = {
  red: '#333',
  blue: '#777',
  skyBlue: '#EEE',
}
```

#### Created Css File 
```css
html {
  /* color */
  --black: #000;
  --red: #F44336;
  --blue: #0B5394;
  --gray: #EEE;
  --whiteSmoke: #F5F5F5;

  /* rgb */
  --black-RGB: 0, 0, 0;
  --red-RGB: 244, 67, 54;
  --blue-RGB: 11, 83, 148;
  --gray-RGB: 238, 238, 238;
  --whiteSmoke-RGB: 245, 245, 245;
}

/* dark theme */
html[data-theme=dark] {
  /* color */
  --red: #000;
  --blue: #EEE;
  --skyBlue: #111;

  /* rgb */
  --red-RGB: 0, 0, 0;
  --blue-RGB: 238, 238, 238;
  --skyBlue-RGB: 17, 17, 17;
}

/* light theme */
html[data-theme=light] {
  /* color */
  --red: #333;
  --blue: #777;
  --skyBlue: #EEE;

  /* rgb */
  --red-RGB: 51, 51, 51;
  --blue-RGB: 119, 119, 119;
  --skyBlue-RGB: 238, 238, 238;
}
```

#### Created Scss File
``` scss
html {
  // color
  --black: #000;
  --red: #F44336;
  --blue: #0B5394;
  --gray: #EEE;
  --whiteSmoke: #F5F5F5;

  // rgb
  --black-RGB: 0, 0, 0;
  --red-RGB: 244, 67, 54;
  --blue-RGB: 11, 83, 148;
  --gray-RGB: 238, 238, 238;
  --whiteSmoke-RGB: 245, 245, 245;
}

// dark theme
html[data-theme=dark] {
  // color
  --red: #000;
  --blue: #EEE;
  --skyBlue: #111;

  // rgb
  --red-RGB: 0, 0, 0;
  --blue-RGB: 238, 238, 238;
  --skyBlue-RGB: 17, 17, 17;
}

// light theme
html[data-theme=light] {
  // color
  --red: #333;
  --blue: #777;
  --skyBlue: #EEE;

  // rgb
  --red-RGB: 51, 51, 51;
  --blue-RGB: 119, 119, 119;
  --skyBlue-RGB: 238, 238, 238;
}
```

## License  📝

This library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).