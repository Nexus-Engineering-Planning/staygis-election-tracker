export enum UserRole {
  ADMIN = "admin",
  SUBMITTER = "user",
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}
