import confi from '../confi.js';
import { Client,ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId);
        this.databases = new Storage(this.client)
    }

// createPost account start

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error)
        }
    }
// createPost account end

// updatePost account start

    async updatePost(slug, {title, content, featuredImage, status}){
      try {
        return await this.databases.updateDocument(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            }
        )
      } catch (error) {
        console.log("Appwrite Service :: updatePost :: error", error)
      }
    }
// updatePost account end


// deletePost account start

    async deletePost(slug){
      try {
        return await this.databases.deleteDocument(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            slug
        )
        return true
      } catch (error) {
        console.log("Appwrite Service :: deletePost :: error", error);
        return false
      }
    }
// deletePost account end

// getPost account start
async getPost(slug){
    try {
        return await this.databases.getDocument(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite Service :: getPost :: error", error);
        return false
        
    }
}
// getPost account end


// getPosts account start

async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocument(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            queries,
            
        )
    } catch (error) {
        console.log("Appwrite Service :: getPosts :: error", error);
        return false
    }
}
// getPosts account end

// File upload service start

async uploadPost(file){
    try {
        return await this.bucket.createFile(
            confi.appwriteBucketId,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("Appwrite Service :: uploadPost :: error", error);
        return false
    }
}
// File upload service end


// File delete service start
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            confi.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite Service :: deleteFile :: error", error);
        return false
    }
}
// File delete service end


// File Preview service start

getFilePreview(fileId){
    return this.bucket.getFilePreview,
    fileId
}
// File Preview service end

}


const service = new Service()
export default service