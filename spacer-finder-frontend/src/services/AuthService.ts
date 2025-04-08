import {AuthStack} from'../../../spacer-finder/outputs.json'

export class AuthService {
  //this is a async method to export a login
  public async login(
    username: string,
    password: string
  ): Promise<Object | undefined> {
    return {
      user: "abc",
    };
  }

  //this a method to return the username
  public getUserName() {
    return "some user to return";
  }
}
