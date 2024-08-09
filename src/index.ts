import { resolve } from 'path'
import { loadEnv } from 'vite';
import type { Plugin } from 'vite'
import { makeFiles } from './utils/file';
import { snakeToCamelCase } from './utils/string';
import { hexToRgb } from './utils/color';

export interface VitePluginEnvColor {
  ENV_FILTER_NAME?: string;
  ENV_THEME_FILTER_NAME?: string;
  ENV_THEME_COLOR_FILTER_NAMES?: string[];
  TS_FILE_NAME?: string;
  TS_BASE_PATH?: string;
  CSS_FILE_NAME?: string;
  CSS_BASE_PATH?: string;
  SCSS_FILE_NAME?: string;
  SCSS_BASE_PATH?: string;
  IS_BUILD_JS?: boolean;
  IS_BUILD_CSS?: boolean;
  IS_BUILD_SCSS?: boolean;
}

export default function vitePluginEnvColor(props: VitePluginEnvColor = {}): Plugin  {
  const { 
    ENV_FILTER_NAME = 'VITE_COLOR', 
    ENV_THEME_FILTER_NAME = 'VITE_THEME', 
    ENV_THEME_COLOR_FILTER_NAMES = ['VITE_THEME_DARK', 'VITE_THEME_LIGHT'],
    TS_FILE_NAME = 'color',  
    TS_BASE_PATH = './src',
    CSS_FILE_NAME = 'color',  
    CSS_BASE_PATH = './public/css',
    SCSS_FILE_NAME = 'color',  
    SCSS_BASE_PATH = './src/assets',
    IS_BUILD_JS = true,
    IS_BUILD_CSS = true,
    IS_BUILD_SCSS = true,
  } = props;

  return {
    name: 'vite-plugin-env-color',
    config ({ root = process.cwd(), envDir }, { mode }) {
      const resolvedRoot = resolve(root)
      envDir = envDir ? resolve(resolvedRoot, envDir) : resolvedRoot
      const env = loadEnv(mode, envDir, '');
      const regExp = new RegExp(`${ENV_FILTER_NAME}`);
      const filteredColor = Object.fromEntries(
        Object.entries(env).filter(([key]) => {
          return key.match(regExp);
        }),
      );

      const data = Object.keys(filteredColor)?.map((item, index) => {
        const value = `#${filteredColor[item]}`;

        return {
          name: snakeToCamelCase(item.split(ENV_FILTER_NAME)[1].slice(1)),
          value,
          last: index === Object.keys(filteredColor).length - 1,
          rgb: hexToRgb(value),
        }
      });

      const themeData = ENV_THEME_COLOR_FILTER_NAMES?.map((item) => {
        const regExp = new RegExp(`${item}`);
        const themeFilteredColor = Object.fromEntries(
          Object.entries(env).filter(([key]) => {
            return key.match(regExp);
          }),
        );
        const originThemeName = item.split(ENV_THEME_FILTER_NAME)[1].slice(1);
        const themeName = snakeToCamelCase(originThemeName).replace('-', '');
        const data = Object.keys(themeFilteredColor)?.map((color, index) => {
          const value = `#${themeFilteredColor[color]}`;
          const name = snakeToCamelCase(color.split(item)[1].slice(1));

          return {
            name,
            value,
            last: index === Object.keys(themeFilteredColor).length - 1,
            rgb: hexToRgb(value),
          }
        });

        return {
          name: themeName.replace('-', ''),
          tsTypeName: `${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}`,
          data,
          isDataEmpty: !data.length,
        }
      });

      makeFiles({
        data,
        themeData,
        TS_FILE_NAME,
        TS_BASE_PATH,
        CSS_FILE_NAME, 
        CSS_BASE_PATH,
        SCSS_FILE_NAME,
        SCSS_BASE_PATH,
        IS_BUILD_JS,
        IS_BUILD_CSS,
        IS_BUILD_SCSS,
      });
    },
  }
}
