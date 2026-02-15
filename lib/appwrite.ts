import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite"
import * as Linking from "expo-linking";
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    platform: 'com.joelsari.urbankey',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client.setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

// This creates image avatars from appwrite
export const avatar = new Avatars(client);

// This creates new accounts using appwrite
export const account = new Account(client);

//Now that we have finished the set up we can create a login functionality!
export async function login() {
    // What happens when something goes right?? (when login button works)
    try{
        // first we need to generate redirect URI, that lets us come back to out page once successfully logged in.
        // WE WILL USE THE EXPO MODULE called EXPO linking!
        const redirectUri = Linking.createURL('/')

        // Now we need to create an Oauth token using the google Provider, using the built in function and passing the parameter to redirect into the home page
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        // IF for some reason it fails (wrong credentials)
        if (!response) throw new Error("Failed to Login");

        // If succeeds, then we should open a browser login to continue
        const browserResult = await openAuthSessionAsync(
            // response from google!
            response.toString(),
            // Leads
            redirectUri,


        )
        // if the browser Login ALSO fails we can throw an error
        if( browserResult.type !== 'success') throw new Error("Failed to Login");

        const url = new URL(browserResult.url);

        // We also need to collect the secret and userId of each person to create a new account session for each user
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        // NOTE there is a chance that neither exist thus we need to ensure we throw errors for those too
        if(!userId || !secret) throw new Error("Failed to Login");

        // Lastly we need to create the session given the parameters collected
        const session = await account.createSession(userId, secret);

        if(!session) throw new Error("Failed to Create Session");

        // we succesfully logged in
        return true



    }
    catch (error){
        console.log(error);
        return false
    }
}

// LOGOUT FUNCTION

export async function logout() {
    try{
        // we need to delete the created session for the user
        await account.deleteSession('current');
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

// We need to create another function that gets information about our user
export async function getUser() {
    try{
        const response = await account.get();

        // if we succesfully get a response then
        if(response.$id){
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            }

        }


    }
    catch(error){
        console.log(error);
        return null;
    }

}
