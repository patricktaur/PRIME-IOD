// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
//
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(
    id?: string,
    userName?: string,
    fullName?: string,
    email?: string,
    jobTitle?: string,
    phoneNumber?: string,
    roles?: string[]
  ) {
    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
  }

  get friendlyName(): string {
    let name : any = this.fullName || this.userName;

    if (this.jobTitle) name = this.jobTitle + ' ' + name;

    return name;
  }

  public id: string | undefined;
  public userName: string | undefined;
  public fullName: string | undefined;
  public email: string | undefined;
  public jobTitle: string | undefined;
  public phoneNumber: string | undefined;
  public isEnabled: boolean = false;
  public isLockedOut: boolean = false;
  public roles: string[] | undefined = [];
}
