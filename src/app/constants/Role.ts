export class Role {
  
  public static userRoles = {

    EEO: 'EEO',
    SUPER_ADMIN: 'SUPER ADMIN',
    CAMPUS_AMBASSADOR: 'CAMPUS AMBASSADOR',
    ADMIN: 'ADMIN',
    USER: 'USER',
    MEMBER: 'MEMBER'
  };

  public static getAllRoles(): string[] {
    return [this.userRoles.ADMIN, this.userRoles.CAMPUS_AMBASSADOR, this.userRoles.EEO, this.userRoles.MEMBER, this.userRoles.SUPER_ADMIN, this.userRoles.ADMIN];
  }
}
