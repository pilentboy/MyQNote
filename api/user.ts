import { get, put, post, del } from "./apiService";

export const fetchUserCloudNotes = (accessKey: string) =>
  get("user_notes", accessKey);
