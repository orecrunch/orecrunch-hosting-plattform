interface User {
  email: string;
 
  permissions: UserPermissions;
}

interface UserPermissions {
  file_permissions: FilePermissions;
}

interface FilePermissions {
   home_dir: string;
  read: boolean;
  write: boolean;
  create: boolean;
  delete: boolean;
  sftp: boolean;
  archive: boolean;
}