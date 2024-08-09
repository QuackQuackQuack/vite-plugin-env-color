import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import { RGB } from './color';

interface MakeFilesDataItem {
  name: string;
  value: string;
  last: boolean;
  rgb: RGB;
}

interface ThemeFilesDataItem {
  name: string;
  tsTypeName: string;
  data: MakeFilesDataItem[];
  isDataEmpty: boolean;
}

interface MakeFiles {
  TS_FILE_NAME: string;
  TS_BASE_PATH: string;
  CSS_FILE_NAME: string;
  CSS_BASE_PATH: string;
  SCSS_FILE_NAME: string;
  SCSS_BASE_PATH: string;
  IS_BUILD_JS: boolean;
  IS_BUILD_SCSS: boolean;
  IS_BUILD_CSS: boolean;
  data: MakeFilesDataItem[];
  themeData: ThemeFilesDataItem[];
}


 /**
  * @interface MakeFiles
  */
export async function makeFiles(props: MakeFiles) {
  const { 
    TS_FILE_NAME,
    TS_BASE_PATH,
    CSS_FILE_NAME,
    CSS_BASE_PATH,
    SCSS_FILE_NAME,
    SCSS_BASE_PATH,
    IS_BUILD_JS,
    IS_BUILD_SCSS,
    IS_BUILD_CSS,
    data,
    themeData,
  } = props;

  if (!!data.length || !!themeData.length) {
    if (IS_BUILD_JS) {
      fs.mkdirSync( TS_BASE_PATH, { recursive: true } );
      const scriptTemplate = await makeScriptFile(data, themeData);
      fs.writeFileSync(path.resolve(TS_BASE_PATH, `${TS_FILE_NAME}.ts`), scriptTemplate, { encoding:'utf8', flag:'w'} );
    }
  
    if (IS_BUILD_CSS) {
      fs.mkdirSync( CSS_BASE_PATH, { recursive: true } );
      const cssTemplate = await maekCssFile(data, themeData);
      fs.writeFileSync(path.resolve(CSS_BASE_PATH, `${CSS_FILE_NAME}.css`), cssTemplate, { encoding:'utf8', flag:'w'});  
    }
  
    if (IS_BUILD_SCSS) {
      fs.mkdirSync( SCSS_BASE_PATH, { recursive: true } );
      const scssTemplate = await maekScssFile(data, themeData);
      fs.writeFileSync(path.resolve(SCSS_BASE_PATH, `${SCSS_FILE_NAME}.scss`), scssTemplate, { encoding:'utf8',flag:'w'} );  
    }
  }
}

/**
 * makeScriptFile
 * @param {Object} data data
 * @param {Object} themeData themeData
 * @returns {Promise<string>} Template html
 */
async function makeScriptFile(data: MakeFilesDataItem[], themeData: ThemeFilesDataItem[]): Promise<string> {
  const isEmpty = !data?.length;
  const isThemeEmpty = !themeData?.length;
  const template = `{{^isEmpty}}
// color
export type ColorType = {{#data}}'{{name}}' {{^last}}|{{/last}}{{/data}};
export type Color = Record<ColorType, string>;
{{/isEmpty}}

{{^isThemeEmpty}}
{{#themeData}}
{{^isDataEmpty}}
// {{name}} theme color
export type {{tsTypeName}}ColorType = {{#data}}'{{name}}' {{^last}}|{{/last}}{{/data}};
export type {{tsTypeName}}Color = Record<{{tsTypeName}}ColorType, string>;

{{/isDataEmpty}}
{{/themeData}}
{{/isThemeEmpty}}
{{^isEmpty}}
export const color: Color = {
  {{#data}}
  {{name}}: '{{value}}',
  {{/data}} 
}
{{/isEmpty}}
{{^isThemeEmpty}}
{{#themeData}}
{{^isDataEmpty}}
export const {{name}}Color: {{tsTypeName}}Color = {
  {{#data}}
  {{name}}: '{{value}}',
  {{/data}} 
}
{{/isDataEmpty}}
{{/themeData}}
{{/isThemeEmpty}}
  `
  return mustache.render(template, { isEmpty, isThemeEmpty, data, themeData })
}

/**
 * maekCssFile
 * @param {Object} data data
 * @param {Object} themeData themeData
 * @returns {Promise<string>} Template html
 */
async function maekCssFile(data: MakeFilesDataItem[], themeData: ThemeFilesDataItem[]): Promise<string> {
  const isEmpty = !data?.length;
  const isThemeEmpty = !themeData?.length;
  const template = `{{^isEmpty}}
html {
  /* color */
  {{#data}}
  --{{name}}: {{value}};
  {{/data}}

  /* rgb */
  {{#data}}
  --{{name}}-RGB: {{rgb.r}}, {{rgb.g}}, {{rgb.b}};
  {{/data}}
}
{{/isEmpty}}

{{^isThemeEmpty}}
{{#themeData}}
{{^isDataEmpty}}
/* {{name}} theme */
html[data-theme={{name}}] {
  /* color */
  {{#data}}
  --{{name}}: {{value}};
  {{/data}}

  /* rgb */
  {{#data}}
  --{{name}}-RGB: {{rgb.r}}, {{rgb.g}}, {{rgb.b}};
  {{/data}}
}

{{/isDataEmpty}}
{{/themeData}}
{{/isThemeEmpty}}
  `
  return mustache.render(template, { isEmpty, isThemeEmpty, data, themeData })
}

/**
 * maekScssFile
 * @param {Object} data data
 * @param {Object} themeData themeData
 * @returns {Promise<string>} Template html
 */
async function maekScssFile(data: MakeFilesDataItem[], themeData: ThemeFilesDataItem[]): Promise<string> {
  const isEmpty = !data?.length;
  const isThemeEmpty = !themeData?.length;
  const template = `{{^isEmpty}}
html {
  // color
  {{#data}}
  --{{name}}: {{value}};
  {{/data}}

  // rgb
  {{#data}}
  --{{name}}-RGB: {{rgb.r}}, {{rgb.g}}, {{rgb.b}};
  {{/data}}
}
{{/isEmpty}}

{{^isThemeEmpty}}
{{#themeData}}
{{^isDataEmpty}}
// {{name}} theme
html[data-theme={{name}}] {
  // color
  {{#data}}
  --{{name}}: {{value}};
  {{/data}}

  // rgb
  {{#data}}
  --{{name}}-RGB: {{rgb.r}}, {{rgb.g}}, {{rgb.b}};
  {{/data}}
}

{{/isDataEmpty}}
{{/themeData}}
{{/isThemeEmpty}}
  `
  return mustache.render(template, { isEmpty, isThemeEmpty, data, themeData })
}

