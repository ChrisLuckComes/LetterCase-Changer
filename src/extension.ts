// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { camelCaseToUnderLine as toUnderLine } from "./tool/changeNameStyle";

/**
 * @desc get textEditor's selection words
 * @param editor
 * @param selection
 * @returns {string | undefined} words
 */
function getSelectionText(
  editor?: vscode.TextEditor,
  selection?: vscode.Selection
) {
  let words = undefined;
  if (selection) {
    let { anchor, active } = selection;

    words = vscode.window.activeTextEditor?.document.getText(
      new vscode.Range(anchor, active)
    );
  }
  return words;
}

function registerCommand(eventName: string, callback: () => void) {
  return vscode.commands.registerCommand(eventName, callback);
}

function save(editor: vscode.TextEditor) {
  editor.document.save();
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "letter-case-changer" is now active!'
  );

  const editor = vscode.window.activeTextEditor,
    selection = editor?.selection;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let toUpperCase = registerCommand("letter-case-changer.toUpperCase", () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World from Letter Case Changer!');

      let words = getSelectionText(editor, selection);

      if (selection && words) {
        editor?.edit((editBuilder) => {
          editBuilder.replace(selection, words!.toUpperCase());
          vscode.window
            .showInformationMessage("toUpperCase suceessfully!")
            .then(() => save(editor));
        });
      }
    }),
    toLowerCase = registerCommand("letter-case-changer.toLowerCase", () => {
      let words = getSelectionText(editor, selection);

      if (selection && words) {
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, words!.toLowerCase());
          vscode.window
            .showInformationMessage("toLowerCase suceessfully!")
            .then(() => save(editor));
        });
      }
    }),
    camelCaseToUnderLine = registerCommand(
      "letter-case-changer.camelCaseToUnderLine",
      () => {
        let words = getSelectionText(editor, selection);

        if (selection && words) {
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, toUnderLine(words!));
            vscode.window
              .showInformationMessage("camelCaseToUnderLine suceessfully!")
              .then(() => save(editor));
          });
        }
      }
    );
  context.subscriptions.push(toUpperCase, toLowerCase, camelCaseToUnderLine);
}

// This method is called when your extension is deactivated
export function deactivate() {}
