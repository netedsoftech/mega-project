import config from "../confi/config.js";
import { Client, Account, ID  } from "appwrite";

export class AuthService {
     client = new Client();
     account;

     constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
     }

// Create user account start
async createAccount({email, password, name}) {
    try {
     const userAccount =  await this.account.create(ID.unique(), email, password, name)
       if(userAccount) {
        // call another method
           return this.login({email, password})
       }
       else{
        return userAccount
       }
    } catch (error) {
        throw error;
    }
 }
// Create user account end

// Login user account start

     async login({email, password}) {
        try {
          return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
     }
// Login user account end


// Current user account start

async getCurrentUser(){
    try{
        return await this.account.get();
    }catch (error) {
        console.log("Appwrite Service :: getCurrentUser :: error", error)
    }
    return null;
}

// Current user account end


// Logout user account start

async logout(){
    try{
       return await this.account.deleteSessions();
    }catch (error){
        console.log("Appwrite Service :: logout :: error", error)
    }
}

// Logout user account end

}

const authService = new AuthService();

export default authService

