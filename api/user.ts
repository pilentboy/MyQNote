import { get, put, post, del } from "./apiService";

export const fetchUserCloudNotes = (accessKey: string) =>
  get("user/user_notes", accessKey);

export const fetchUserFriends = (accessKey: string) =>
  get("user_friends", accessKey);

export const fetchSharedNotes = (accessKey: string) =>
  get("user_shared_notes", accessKey);

export const fetchSearchedUsers = (
  accessKey: string,
  searchedUsername: string
) => get(`search_users?username=${searchedUsername}`, accessKey);

export const fetchNotifications = (accessKey: string) =>
  get("notification", accessKey);

export const fetchPendingRequests = (accessKey: string) =>
  get("pending_requests", accessKey);

export const addUserCloudNote = (accessKey: string, body: any) =>
  post("add_note", body, accessKey);

export const shareNote = (accessKey: string, body: any) =>
  post("share_note", body, accessKey);

export const addFriend = (accessKey: string, body: any) =>
  post(`friend_request`, body, accessKey);

export const deleteUserCloudNotes = (accessKey: string) =>
  del("delete_notes", accessKey);

export const deleteFriend = (accessKey: string, body: any) =>
  del("delete_friend_request", accessKey, body);

export const deleteCloudNote = (accessKey: string, id: any) =>
  del(`user/delete_note/${id}`, accessKey);

export const acceptFriendRequest = (accessKey: string, body: any) =>
  put("accept_friend_request", accessKey, body);

export const editCloudNote = (accessKey: string, body: any) =>
  put("edit_note", accessKey, body);
