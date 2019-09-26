import {College} from './college';
import {Address} from './address';

export class User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: String;
  mobileNumber: number;
  whatsappNumber: number;
  city: string;
  profilePic: string;
  college: College;
  unregisteredCollege: string;
  courseName: string;
  batch: string;
  presentAddress: Address;
  permanentAddress: Address;
  achievements: string;
  hobbies: string;
  skills: string;
  inspirationSource: string;
  membershipId: string;
  isMemberApproved: boolean;
}
