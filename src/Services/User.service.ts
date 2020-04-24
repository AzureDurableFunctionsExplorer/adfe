import { UserInfoDto } from "../Dtos/userInfo.dto";
import { authFetch } from "../Core/Utils/authFetch";
import { authProvider } from "../Core/Auth/AuthProvider";
import { AuthenticationState } from "react-aad-msal";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { distinct } from "rxjs/operators";

class UserServiceClass {

  private isLoggedInSubject: Subject<boolean> = new BehaviorSubject<boolean>(!!authProvider.UserAgentApplication.getAccount());

  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.pipe(distinct());

  constructor() {
    authProvider.registerAuthenticationStateHandler((state: AuthenticationState) => {
      this.isLoggedInSubject.next(state === AuthenticationState.Authenticated);
    })
  }

  getUserInfo(): UserInfoDto | undefined {

    const account = authProvider.UserAgentApplication.getAccount();
    if (account)
      return {
        displayName: account.name,
        userName: account.userName
      }
  }

  async getUserImage(): Promise<Blob> {
    const response = await authFetch('https://graph.microsoft.com/beta/me/photos/64x64/$value', { method: 'GET' });

    return await response.blob();
  }

  login(): void {
    authProvider.login();
  }

  logout(): void {
    authProvider.loginRedirect();
  }
}

export const UserService = new UserServiceClass();