import { MsalAuthProvider, LoginType, IMsalAuthProviderConfig } from 'react-aad-msal';
import { Configuration, Logger, LogLevel, AuthenticationParameters } from 'msal';

const authLogCallback = (level: LogLevel, message: string, containsPii: boolean) => {
  console.log("AUTH MESSAGE: ", message);
}

const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_MAIN_URL!,
    postLogoutRedirectUri: process.env.REACT_APP_MAIN_URL!,
    authority: 'https://login.microsoftonline.com/common'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  },
  system: {
    logger: new Logger(authLogCallback)
  }
}

const authParams: AuthenticationParameters = {
  scopes: ["User.Read"],

}

const options: IMsalAuthProviderConfig = {
  loginType: LoginType.Redirect
}

export const authProvider = new MsalAuthProvider(configuration, authParams, options);