// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
    const vscode = acquireVsCodeApi();

    const button = /** @type {HTMLElement} */ (document.getElementsByClassName('button')); 
    button.innerText = "Hello from JS"
}());