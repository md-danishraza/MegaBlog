const conf = {
  awUrl: String(import.meta.env.VITE_AW_URL),
  awProjectId: String(import.meta.env.VITE_AW_PROJECT_ID),
  awDatabaseId: String(import.meta.env.VITE_AW_DATABASE_ID),
  awCollectionId: String(import.meta.env.VITE_AW_COLLECTION_ID),
  awBucketId: String(import.meta.env.VITE_AW_BUCKET_ID),
};

export default conf;
