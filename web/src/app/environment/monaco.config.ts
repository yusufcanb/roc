import {NgxMonacoEditorConfig} from "ngx-monaco-editor";

declare var monaco: any;

export function onMonacoLoad() {
  // fetch('assets/monaco/themes/Chrome DevTools.json')
  //   .then(data => data.json())
  //   .then(data => {
  //     console.log(monaco);
  //     monaco.editor.defineTheme('github', data);
  //     monaco.editor.setTheme("github");
  //   })
}

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: {
    scrollBeyondLastLine: false,
    fontFamily: "Courier Code",
    fontLigatures: true,
    fontSize: "18px",
    fontWeight: "500",
    contextmenu: false,
    minimap: {
      enabled: false,
    },
  },
  onMonacoLoad
};
