import config from '../confi/config.js';
import { Client,ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

// createPost account start

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
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
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
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
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
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
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
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
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite Service :: getPosts :: error", error);
        return false
    }
}
// getPosts account end

// File upload service start

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false
    }
}
// File upload service end


// File delete service start
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite Service :: deleteFile :: error", error);
        return false
    }
}
// File delete service end


// File Preview service start

// getFilePreview(fileId){
//     return this.bucket.getFilePreview,
//     fileId
// }

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}
// File Preview service end

}


const service = new Service()
export default service