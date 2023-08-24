// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Trace,
} from 'vscode-languageclient/node';

let client: LanguageClient;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const serverExecutable = { command: 'shader-ls', args: ['--stdio'] };

	const serverOptions: ServerOptions = {
		run: serverExecutable,
		debug: serverExecutable
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'ShaderLab' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/*.shader')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'shader-ls',
		'shader-language-server',
		serverOptions,
		clientOptions
	);

	// Register the commands
	context.subscriptions.push(vscode.commands.registerCommand('vscode-shader.start', start));

	// Start the client. This will also launch the server
	{
		console.log('[INFO] `shader-language-server` is running!');
		client.setTrace(Trace.Verbose);
		client.start();
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

async function start() {
	//console.log('test start command!!!!!!!!!!~~');
}
