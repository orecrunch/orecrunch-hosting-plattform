export interface Files {
  name: string;
  size: number;
  dir: boolean;
};

export interface FilesResponse {
  files: Files[];
}

export interface User {
  email: string;
 
  permissions: UserPermissions;
}

export interface UserPermissions {
  file_permissions: FilePermissions;
}

export interface FilePermissions {
   home_dir: string;
  read: boolean;
  write: boolean;
  create: boolean;
  delete: boolean;
  sftp: boolean;
  archive: boolean;
}