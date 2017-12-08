
```js
// keybindings.json
[
    // emet绑定的按键；
    {
        "key": "shift+ctrl+a",
        "command": "editor.emmet.action.wrapIndividualLinesWithAbbreviation",
        "when": "editorTextFocus"
    },
    {
        "key": "shift+ctrl+q",
        "command": "editor.emmet.action.balanceOut",
        "when": "editorTextFocus"
    },
    {
        "key": "shift+ctrl+z",
        "command": "editor.emmet.action.prevEditPoint",
        "when": "editorTextFocus"
    },
    {
        "key": "shift+ctrl+x",
        "command": "editor.emmet.action.removeTag",
        "when": "editorTextFocus"
    },
    {
        "key": " shift+alt+m",
        "command": "workbench.actions.view.problems"
    },
    {
        "key": "ctrl+shift+m",
        "command": "-workbench.actions.view.problems"
    }
]

```