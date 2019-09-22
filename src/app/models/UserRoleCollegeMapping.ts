import {Role} from './role';
import {User} from './user';
import {College} from './college';

export class UserRoleCollegeMapping {

  id: number;
  role: Role;
  user: User;
  collegeList: College[];

}
