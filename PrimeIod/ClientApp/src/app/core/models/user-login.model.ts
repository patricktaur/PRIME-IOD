// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
//
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

export class UserLogin {
  constructor(email?: string, password?: string, rememberMe?: boolean) {
    this.email = email;
    this.password = password;
    this.rememberMe = rememberMe;
  }

  email: string;
  password: string;
  rememberMe: boolean;
}
