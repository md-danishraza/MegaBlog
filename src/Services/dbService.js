import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

class DbService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.awUrl)
      .setProject(conf.awProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.awDatabaseId,
        conf.awCollectionId,
        // url params for dynamic route page
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    // slug is document id
    try {
      return await this.databases.updateDocument(
        conf.awDatabaseId,
        conf.awCollectionId,
        // doc id
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.awDatabaseId,
        conf.awCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.awDatabaseId,
        conf.awCollectionId,
        // doc id
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.awDatabaseId,
        conf.awCollectionId,
        // doc id
        slug
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  //   bucket methods
  async uploadFile(file) {
    try {
      return await this.storage.createFile(conf.awBucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.awBucketId, fileId);
      return true;
    } catch (error) {
      return false;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.storage.getFileView(conf.awBucketId, fileId);
    } catch (error) {
      throw error;
    }
  }
}

export default new DbService();
