import {College} from './college';

export class Activity {

  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  collegeList: College[];
  status: string;
  type: string;
}
