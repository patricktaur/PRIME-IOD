// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
//
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

import { User } from './user.model';

export class UserEdit extends User {
  constructor(currentPassword?: string, newPassword?: string, confirmPassword?: string) {
    super();

    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }

  public currentPassword: string | undefined;
  public newPassword: string | undefined;
  public confirmPassword: string | undefined;
}
