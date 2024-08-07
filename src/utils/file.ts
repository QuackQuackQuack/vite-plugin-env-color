import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import { hexToRgb } from './color';

interface MakeFilesDataItem {
  name: string;
  value: string;
  last: boolean;
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
  } = props;

  const withRGB = data.map((item) => {
    return {
      ...item,
      rgb: hexToRgb(item.value),
    }
  });

  if (IS_BUILD_JS) {
    fs.mkdirSync( TS_BASE_PATH, { recursive: true } );
    const scriptTemplate = await makeScriptFile(data);
    fs.writeFileSync(path.resolve(TS_BASE_PATH, `${TS_FILE_NAME}.ts`), scriptTemplate, { encoding:'utf8', flag:'w'} );
  }

  if (IS_BUILD_CSS) {
    fs.mkdirSync( CSS_BASE_PATH, { recursive: true } );
    const cssTemplate = await maekCssFile(withRGB);
    fs.writeFileSync(path.resolve(CSS_BASE_PATH, `${CSS_FILE_NAME}.css`), cssTemplate, { encoding:'utf8', flag:'w'});  
  }

  if (IS_BUILD_SCSS) {
    fs.mkdirSync( SCSS_BASE_PATH, { recursive: true } );
    const scssTemplate = await maekScssFile(withRGB);
    fs.writeFileSync(path.resolve(SCSS_BASE_PATH, `${SCSS_FILE_NAME}.scss`), scssTemplate, { encoding:'utf8',flag:'w'} );  
  }
}

/**
 * makeScriptFile
 * @param {Object} data data
 * @returns {Promise<string>} Template html
 */
async function makeScriptFile(data: MakeFilesDataItem[]): Promise<string> {
  const template = `
export type ColorsType = {{#data}}'{{name}}' {{^last}}|{{/last}}{{/data}};
export type Colors = Record<ColorsType, string>;

export const colors: Colors = {
  {{#data}}
  {{name}}: '{{value}}',
  {{/data}} 
}
  `
  return mustache.render(template, { data })
}

/**
 * maekCssFile
 * @param Object} data data
 * @returns {Promise<string>} Template html
 */
async function maekCssFile(data: MakeFilesDataItem[]): Promise<string> {
  const template = `
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
  `
  return mustache.render(template, { data })
}

/**
 * maekScssFile
 * @param {Object} data data
 * @returns {Promise<string>} Template html
 */
async function maekScssFile(data: MakeFilesDataItem[]): Promise<string> {
  const template = `
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
  `
  return mustache.render(template, { data })
}

