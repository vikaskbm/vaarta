import * as vscode from 'vscode';
import * as polka from "polka";
import { apiBaseUrl } from './constants';
import { TokenManager } from './TokenManager';

export const authenticate = (fun: () => void) => {
    const app = polka()
    
    app.get('/auth/:token', async (req, res) => {
        const { token } = req.params;
        if(!token) {
            res.end(`<h1>Something went wrong</h1>`)
        }
        console.log(token)
        
        await TokenManager.setToken(token)
        fun()

        res.end(`<h1>Auth successful. Close this window</h1>`)

        app.server?.close()
    })
    app.listen(54321, (err: Error) => {
        if(err) {
            vscode.window.showErrorMessage(err.message)
        } else {
            vscode.commands.executeCommand(
                'vscode.open', 
                vscode.Uri.parse(`${apiBaseUrl}/auth/github`)
            )
        }
    })
}