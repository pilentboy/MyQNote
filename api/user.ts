import { get, put, post, del } from "./apiService";

export const fetchUserCloudNotes = (accessKey: string) =>
  get("user_notes", accessKey);

export const addUserCloudNote = (accessKey: string, body: any) =>
  post("add_note", body, accessKey);

export const deleteUserCloudNotes = (accessKey: string) =>
  del("delete_notes", accessKey);
