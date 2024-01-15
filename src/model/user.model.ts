interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
}
interface IUserData {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
}
interface IUserTable {
  id: string;
  name: string;
  username: string;
}

interface IUserLogin {
  username: string;
  token: string;
}

interface ILoginResponse {
  data: IUserLogin;
}
