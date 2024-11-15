import { request, APIResponse } from '@playwright/test';
import * as fs from 'fs';




export async function sendApiRequest(apiUrl: string, requestBody: any): Promise<APIResponse> {
    const apiContext = await request.newContext();
    const response = await apiContext.post(apiUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: requestBody,
    });
    return response;
}

export function saveUsernameToFile(tempFilePath: string, username: string) {
    fs.writeFileSync(tempFilePath, username, 'utf8');
    console.log(`Stored Username: ${username}`);
}



