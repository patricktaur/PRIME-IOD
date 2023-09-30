// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
//
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

import { Permission } from './permission.model';

export class Role {
  constructor(name?: string, description?: string, permissions?: Permission[]) {
    this.name = name;
    this.description = description;
    this.permissions = permissions;
  }

  public id: string;
  public name: string;
  public description: string;
  public usersCount: string;
  public permissions: Permission[];
}
