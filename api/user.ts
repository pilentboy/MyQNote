import { get, put, post, del } from "./apiService";

export const fetchUserCloudNotes = (accessKey: string) =>
  get("user/user_notes", accessKey);

export const fetchUserFriends = (accessKey: string) =>
  get("user/user_friends", accessKey);

export const fetchSharedNotes = (accessKey: string) =>
  get("user/user_shared_notes", accessKey);

export const fetchSearchedUsers = (
  accessKey: string,
  searchedUsername: string
) => get(`user/search_users?username=${searchedUsername}`, accessKey);

export const fetchNotifications = (accessKey: string) =>
  get("user/notification", accessKey);

export const fetchPendingRequests = (accessKey: string) =>
  get("user/pending_requests", accessKey);

export const addUserCloudNote = (accessKey: string, body: any) =>
  post("user/add_note", body, accessKey);

export const shareNote = (accessKey: string, body: any) =>
  post("user/share_note", body, accessKey);

export const addFriend = (accessKey: string, body: any) =>
  post(`user/friend_request`, body, accessKey);

export const deleteUserCloudNotes = (accessKey: string) =>
  del("user/delete_notes", accessKey);

export const deleteFriend = (accessKey: string, body: any) =>
  del("user/delete_friend_request", accessKey, body);

export const deleteCloudNote = (accessKey: string, id: any) =>
  del(`user/delete_note/${id}`, accessKey);

export const acceptFriendRequest = (accessKey: string, body: any) =>
  put("user/accept_friend_request", accessKey, body);

export const editCloudNote = (accessKey: string, body: any) =>
  put("user/edit_note", accessKey, body);
