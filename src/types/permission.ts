export type PermissionType = {
  permissionId: number;
  syllabusAccess: AccessLevel;
  programAccess: AccessLevel;
  userAccess: AccessLevel;
  classAccess: AccessLevel;
  materialAccess: AccessLevel;
};

export type AccessTo = 'syllabus' | 'program' | 'user' | 'class' | 'material' | 'home' | 'calendar' | 'settings';
export type AccessLevel = 'Access denied' | 'View' | 'Full access' | 'Modify' | 'Create';
