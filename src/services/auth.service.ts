import httpService from "@/utils/axios";

class AuthService {
  public register(username: string, password: string, firstName: string, lastName: string): Promise<IUser> {
    const schema = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    return httpService.post("/register", schema);
  }
  public login(username: string, password: string): Promise<ILoginResponse> {
    const schema = {
      username: username,
      password: password,
    };
    return httpService.post("/login", schema);
  }
  public logout(isRootAdmin: boolean): Promise<void> {
    localStorage.removeItem(process.env.TOKEN_NAME as string);

    if (isRootAdmin) return httpService.post("/logout");
    else return httpService.post("/logout");
  }
  // public forgotPassword(email: string): Promise<AxiosResponse> {
  //   const callback = process.env.REACT_APP_CALLBACK_FORGOT_PASSOWRD;
  //   return httpService.post("/forgot-password", { email, callback });
  // }
  // public changePassword(password: string, token: string): Promise<AxiosResponse> {
  //   return httpService.post("/forgot-password/token", { password, token });
  // }

  // public getRootProfile(): Promise<AxiosResponse<Response>> {
  //   return httpService.get<Response>("/profile");
  // }
  // public getUserProfile(): Promise<AxiosResponse<Response>> {
  //   return httpService.get<Response>("/profile");
  // }

  // public updateRootProfile(firstname: string, lastname: string, email: string, tel: string): Promise<AxiosResponse> {
  //   return httpService.put("/profile", {
  //     firstname,
  //     lastname,
  //     email,
  //     tel,
  //   });
  // }
  // public updateAdminProfile(firstname: string, lastname: string, email: string, tel: string): Promise<AxiosResponse> {
  //   return httpService.put("/profile", {
  //     firstname,
  //     lastname,
  //     email,
  //     tel,
  //   });
  // }
  // public updateRootPassword(password: string, newpassword: string): Promise<AxiosResponse> {
  //   return httpService.put("/profile/password", { password, newpassword });
  // }
  // public updateAdminPassword(password: string, newpassword: string): Promise<AxiosResponse> {
  //   return httpService.put("/profile/password", {
  //     password,
  //     newpassword,
  //   });
  // }
}

export const authService = new AuthService();
