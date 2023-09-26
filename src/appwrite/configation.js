import confige from "../confige/confige";

import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(confige.appwriteUrl)
      .setProject(confige.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ titel, slug, content, featuredImages, status, userId }) {
    try {
      return await this.databases.createDocument(
        confige.appwriteDatabaseId,
        confige.appwriteCollectionId,
        slug,
        {
          titel,
          content,
          featuredImages,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error  ", error);
    }
  }

  async updatePost(slug, { titel, content, featuredImages, status }) {
    try {
      return await this.databases.updateDocument(
        confige.appwriteDatabaseId,
        confige.appwriteCollectionId,
        slug,
        {
          titel,
          content,
          featuredImages,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error  ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        confige.appwriteDatabaseId,
        confige.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error  ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        confige.appwriteDatabaseId,
        confige.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error  ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        confige.appwriteDatabaseId,
        confige.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error  ", error);
      return false;
    }
  }
  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        confige.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error  ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(confige.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error  ", error);
      return false;
    }
  }

  getFilePreviwe(fileId) {
    return this.bucket.getFilePreview(confige.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
