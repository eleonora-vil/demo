import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../api/config/axios-client';

export type AccessLevel = 'Access denied' | 'View' | 'Full access' | 'Modify' | 'Create';
export type AccessTo = 'syllabus' | 'training-program' | 'user' | 'class' | 'material' | 'home' | 'training-calendar' | 'settings';

export interface PermissionsLevel {
  isAccessDenied: boolean;
  isView: boolean;
  isFullAccess: boolean;
  isModify: boolean;
  isCreate: boolean;
}

export interface PermissionsTo {
  syllabus: PermissionsLevel;
  program: PermissionsLevel;
  user: PermissionsLevel;
  class: PermissionsLevel;
  material: PermissionsLevel;
  home: PermissionsLevel;
  calendar: PermissionsLevel;
  settings: PermissionsLevel;
}

export interface AuthorizedState {
  trigger: boolean;
  isAuthorized: boolean;
  permissions: PermissionsTo;
}

const initialState: AuthorizedState = {
  trigger: false,
  isAuthorized: false,
  permissions: {
    syllabus: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    program: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    user: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    class: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    material: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    home: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    calendar: {
      isAccessDenied: false,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    },
    settings: {
      isAccessDenied: false,
      isView: true,
      isFullAccess: true,
      isModify: false,
      isCreate: false,
    },
  },
};

export interface getPermissionsResponse {
  success: boolean;
  result: {
    permission: {
      permissionId: number;
      syllabusAccess: AccessLevel;
      programAccess: AccessLevel;
      userAccess: AccessLevel;
      classAccess: AccessLevel;
      materialAccess: AccessLevel;
      roleID: number;
      role: string | null;
    };
  };
}

export const getPermissions = createAsyncThunk('authorized/getPermissions', async (roleId: number) => {
  const response = await axiosClient.get<getPermissionsResponse>(`/api/Permission/GetByRoleId/${roleId}`);
  return response.data;
});

const handlePermissionsLevel = (permissionLevel: AccessLevel): PermissionsLevel => {
  if (permissionLevel === 'Access denied') {
    return {
      isAccessDenied: true,
      isView: false,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    };
  }
  if (permissionLevel === 'View') {
    return {
      isAccessDenied: false,
      isView: true,
      isFullAccess: false,
      isModify: false,
      isCreate: false,
    };
  }
  if (permissionLevel === 'Full access') {
    return {
      isAccessDenied: false,
      isView: true,
      isFullAccess: true,
      isModify: true,
      isCreate: true,
    };
  }
  if (permissionLevel === 'Modify') {
    return {
      isAccessDenied: false,
      isView: true,
      isFullAccess: false,
      isModify: true,
      isCreate: false,
    };
  }
  if (permissionLevel === 'Create') {
    return {
      isAccessDenied: false,
      isView: true,
      isFullAccess: false,
      isModify: false,
      isCreate: true,
    };
  }
  return {
    isAccessDenied: true,
    isView: false,
    isFullAccess: false,
    isModify: false,
    isCreate: false,
  };
};

export const authorizedSlice = createSlice({
  name: 'authorized',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    switchTrigger: (state) => {
      state.trigger = !state.trigger;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      const response = action.payload as getPermissionsResponse;
      console.log(response.result.permission.permissionId == 4)
      if (response.success) {
        state.isAuthorized = true;
        state.permissions = {
          syllabus: handlePermissionsLevel(response.result.permission.syllabusAccess),
          program: handlePermissionsLevel(response.result.permission.programAccess),
          user: handlePermissionsLevel(response.result.permission.userAccess),
          class: handlePermissionsLevel(response.result.permission.classAccess),
          material: handlePermissionsLevel(response.result.permission.materialAccess),
          home: handlePermissionsLevel(response.result.permission.permissionId != 1 ? 'Access denied' :'Full access'),
          calendar: handlePermissionsLevel('Full access'),
          settings: handlePermissionsLevel('Full access'),
        };
      } else {
        state.isAuthorized = false;
      }
    });
  },
});

export const { setPermissions, switchTrigger } = authorizedSlice.actions;
export default authorizedSlice.reducer;
