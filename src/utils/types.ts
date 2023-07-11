export enum StateEnum {
  /** Alaska */
  AK = 'AK',
  /** Alabama */
  AL = 'AL',
  /** Arkansas */
  AR = 'AR',
  /** American Samoa */
  AS = 'AS',
  /** Arizona */
  AZ = 'AZ',
  /** California */
  CA = 'CA',
  /** Colorado */
  CO = 'CO',
  /** Connecticut */
  CT = 'CT',
  /** District Of Columbia */
  DC = 'DC',
  /** Delaware */
  DE = 'DE',
  /** Florida */
  FL = 'FL',
  /** Federated States Of Micronesia */
  FM = 'FM',
  /** Georgia */
  GA = 'GA',
  /** Guam */
  GU = 'GU',
  /** Hawaii */
  HI = 'HI',
  /** Iowa */
  IA = 'IA',
  /** Idaho */
  ID = 'ID',
  /** Illinois */
  IL = 'IL',
  /** Indiana */
  IN = 'IN',
  /** Kansas */
  KS = 'KS',
  /** Kentucky */
  KY = 'KY',
  /** Louisiana */
  LA = 'LA',
  /** Massachusetts */
  MA = 'MA',
  /** Maryland */
  MD = 'MD',
  /** Maine */
  ME = 'ME',
  /** Marshall Islands */
  MH = 'MH',
  /** Michigan */
  MI = 'MI',
  /** Minnesota */
  MN = 'MN',
  /** Missouri */
  MO = 'MO',
  /** Northern Mariana Islands */
  MP = 'MP',
  /** Mississippi */
  MS = 'MS',
  /** Montana */
  MT = 'MT',
  /** North Carolina */
  NC = 'NC',
  /** North Dakota */
  ND = 'ND',
  /** Nebraska */
  NE = 'NE',
  /** New Hampshire */
  NH = 'NH',
  /** New Jersey */
  NJ = 'NJ',
  /** New Mexico */
  NM = 'NM',
  /** Nevada */
  NV = 'NV',
  /** New York */
  NY = 'NY',
  /** Ohio */
  OH = 'OH',
  /** Oklahoma */
  OK = 'OK',
  /** Oregon */
  OR = 'OR',
  /** Pennsylvania */
  PA = 'PA',
  /** Puerto Rico */
  PR = 'PR',
  /** Palau */
  PW = 'PW',
  /** Rhode Island */
  RI = 'RI',
  /** South Carolina */
  SC = 'SC',
  /** South Dakota */
  SD = 'SD',
  /** Tennessee */
  TN = 'TN',
  /** Texas */
  TX = 'TX',
  /** Utah */
  UT = 'UT',
  /** Virginia */
  VA = 'VA',
  /** Virgin Islands */
  VI = 'VI',
  /** Vermont */
  VT = 'VT',
  /** Washington */
  WA = 'WA',
  /** Wisconsin */
  WI = 'WI',
  /** West Virginia */
  WV = 'WV',
  /** Wyoming */
  WY = 'WY',
}

export enum RelationshipEnum {
  SELF = 'self',
  SPOUSE = 'spouse',
  SIBLING = 'sibling',
  PARENT = 'parent',
  FRIEND = 'friend',
  OTHER = 'other',
}

export type PersonType = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export type DependentType = PersonType & { relationship: RelationshipEnum };

export type VehicleType = {
  id?: string;
  VIN: string;
  year: number;
  make: string;
  model: string;
};

export type InsurerType = PersonType & {
  street: string;
  city: string;
  state: StateEnum;
  zipCode: string;
  dependents: DependentType[];
  vehicles: VehicleType[];
};

export type ApplicationType = {
  id?: string;
  insurer: InsurerType | null;
};
