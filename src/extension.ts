import * as vscode from 'vscode';

// Function to update the token color customization for the "Purstel" theme
function updateTokenColorCustomizations(useSemanticItalics: boolean) {
    // Check if the active theme is "Purstel"
    if (vscode.workspace.getConfiguration().get<string>('workbench.colorTheme') === 'Purstel') {
        // Define the token color customizations based on the value of useSemanticItalics
        const fontStyle = useSemanticItalics ? 'italic' : '';

        // Define the TextMate rule for the specific scope
        const textMateRule = {
            scope: [
                'keyword.operator.instanceof.java',
                "keyword.operator.expression.instanceof",
                "keyword.operator.new",
                "keyword.operator.ternary",
                "keyword.operator.optional",
                "keyword.operator.expression.keyof",
                "keyword.operator.sigil.rust",
                "keyword.operator.delete",
                "keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp",
                "keyword.operator.sizeof.c,keyword.operator.sizeof.cpp",
                "keyword.operator.logical.python",
                "keyword.operator.assignment.compound",
                "keyword",
                "token.package.keyword",
                "keyword.control",
                "keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void",
                "keyword.operator.error-control.php",
                "keyword.operator.type.php",
                "php regexp operator",
                "keyword.operator.heredoc.php,keyword.operator.nowdoc.php",
                "keyword.operator.module",
                "keyword.operator.arithmetic.go",
                "keyword.operator.address.go"
            ],
            settings: {
                fontStyle: fontStyle
            }
        };

        // Update the token color customization with the new rule
        vscode.workspace.getConfiguration().update('editor.tokenColorCustomizations', { textMateRules: [textMateRule] }, vscode.ConfigurationTarget.Global);
    }
}

// Function to handle configuration changes
function handleConfigurationChange(event: vscode.ConfigurationChangeEvent) {
    if (event.affectsConfiguration('purstel.useSemanticItalics')) {
        // Retrieve the updated setting value
        const useSemanticItalics = vscode.workspace.getConfiguration('purstel').get<boolean>('useSemanticItalics', true);

        // Update the token color customization based on the new setting value
        updateTokenColorCustomizations(useSemanticItalics);
    }
}

// Activate the extension
export function activate(context: vscode.ExtensionContext) {
    // Subscribe to configuration changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(handleConfigurationChange));

    // Initial update of the token color customization
    const useSemanticItalics = vscode.workspace.getConfiguration('purstel').get<boolean>('useSemanticItalics', true);
    updateTokenColorCustomizations(useSemanticItalics);
}

// Deactivate the extension
export function deactivate() {
    // Cleanup logic...
}