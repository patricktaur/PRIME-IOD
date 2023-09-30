// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
//
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

export type PermissionNames = 'View Users' | 'Manage Users' | 'View Roles' | 'Manage Roles' | 'Assign Roles';

export type PermissionValues = 'users.view' | 'users.manage' | 'roles.view' | 'roles.manage' | 'roles.assign';

export class Permission {
  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

  constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
    this.name = name;
    this.value = value;
    this.groupName = groupName;
    this.description = description;
  }

  public name: PermissionNames | undefined;
  public value: PermissionValues | undefined;
  public groupName: string | undefined;
  public description: string | undefined;
}
