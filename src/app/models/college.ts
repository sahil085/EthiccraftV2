export class College {
  collegeName: string;
  id: number;
  collegeAbbreviation: string;
  universityName: string;
  address: string;
  city: string;
  state: string;
  comments: string;
  faculty: string;
  referenceList: Reference[];
  active: boolean;
}

class Reference {
  name: string;
  designation: string;
  contact: string;
}
