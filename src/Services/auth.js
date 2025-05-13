import conf from "../conf/conf";
// using appwrite web sdk for javascript
import { Client, Account, ID } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.awUrl)
      .setProject(conf.awProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call login method
        await this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // creating server side session
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    // using session to check user
    try {
      const user = await this.account.get();
      return user || null;
    } catch (error) {
      throw error;
    }
  }

  async logOut() {
    // clearing sessions from all devices
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
