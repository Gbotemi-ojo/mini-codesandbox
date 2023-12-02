import React, { useState } from "react";
import "./App.css";
import folderLogo from "./assets/folder.svg";
import htmlLogo from "./assets/html.svg";
import cssLogo from "./assets/css3.svg";
import javascriptlogo from "./assets/javascript.svg";
import Editor from "@monaco-editor/react";
function Codesandbox() {
  const [fileSystem, setfileSystem] = useState({
    language: "html",
    path: "index.html",
  });
  const [htmlCode, sethtmlCode] = useState(``);
  const [cssCode, setcssCode] = useState(``);
  const [javascriptCode, setjavascriptCode] = useState(``);
  function handleEditorDidMount(editor, monaco) {
    // editorRef.current = editor;
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }
  function handleEditorChange(value, event) {
    if (value !== undefined && fileSystem.language === "html")
      sethtmlCode(value);
    if (value !== undefined && fileSystem.language === "css") setcssCode(value);
    if (value !== undefined && fileSystem.language === "javascript")
      setjavascriptCode(value);
  }

  // new script
  const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });

      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, "text/css");
    const jsURL = getBlobURL(js, "text/javascript");

    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      </head>
      <body>
        ${html || ""}
      </body>
        ${
          js &&
          `<script src="${jsURL}">
        </script>`
        }
    </html>
  `;

    return getBlobURL(source, "text/html");
  };

  const url = getGeneratedPageURL({
    html: htmlCode,
    css: cssCode,
    js: javascriptCode,
  });
  const url2 = getGeneratedPageURL({
    html: "<p>Hello, world!</p>",
    css: "p { color: blue; }",
    js: 'console.log("hi")',
  });
  return (
    <>
      <section className="codesandbox">
        <div className="fileSystemContainer">
          <div>Files</div>
          <div className="folderContainer">
            <img src={folderLogo} alt="folder Logo" className="folderLogo" />
            <div>Src</div>
          </div>
          <div className="files">
            <div
              className="html"
              onClick={() =>
                setfileSystem({
                  path: "index.html",
                  language: "html",
                })
              }
            >
              <img src={htmlLogo} alt="html Logo" className="htmlLogo" />
              Index.html
            </div>
            <div
              className="styles"
              onClick={() =>
                setfileSystem({
                  path: "style.css",
                  language: "css",
                })
              }
            >
              <img src={cssLogo} alt="styles Logo" className="cssLogo" />
              styles.css
            </div>
            <div
              className="script"
              onClick={() =>
                setfileSystem({
                  path: "script.js",
                  language: "javascript",
                })
              }
            >
              <img
                src={javascriptlogo}
                alt="script logo"
                className="scriptLogo"
              />
              script.js
            </div>
          </div>
        </div>
        <div className="code">
          <Editor
            height="100%"
            width="100%"
            defaultLanguage={fileSystem.language}
            language={fileSystem.language}
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            theme="vs-dark"
            path={fileSystem.path}
          />
        </div>
        <div className="browser">
          <iframe src={url} id="iframe"></iframe>
        </div>
      </section>
    </>
  );
}

export default Codesandbox;
