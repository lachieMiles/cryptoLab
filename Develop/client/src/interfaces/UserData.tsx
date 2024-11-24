export interface UserData {
    id: number; // Unique identifier for the user
    username: string; // Username of the user
    email: string; // User's email address
    createdAt?: string; // Timestamp when the user was created (optional)
    updatedAt?: string; // Timestamp when the user was last updated (optional)
}
  