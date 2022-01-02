import * as vscode from 'vscode';
import { authenticate } from './authenticate';
import { SidebarProvider } from './SidebarProvider';
import { TokenManager } from './TokenManager';

export function activate(context: vscode.ExtensionContext) {
	TokenManager.globalState = context.globalState
	
	const sidebarProvider = new SidebarProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		  "varta-sidebar",
		  sidebarProvider
		)
	  );
  
	context.subscriptions.push(
		vscode.commands.registerCommand('varta.helloWorld', () => {
			vscode.window.showInformationMessage('token value is: ' + TokenManager.getToken())
			// vscode.window.showInformationMessage('Hello World from varta!');
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('varta.authenticate', () => {
			// authenticate();
			authenticate(() => {});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('varta.refresh', async () => {
			await vscode.commands.executeCommand("workbench.action.closeSidebar")
			await vscode.commands.executeCommand("workbench.view.extension.varta-sidebar-view")
		})
	);
}

export function deactivate() {}
