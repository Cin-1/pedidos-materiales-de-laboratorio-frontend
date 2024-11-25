export interface SolventRequest {
  name: string;
  description: string;
}

export interface ReactiveRequest {
  quantity: number;
  unitMeasure: string;
  quality: string;
  concentrationType: string;
  concentrationAmount: string;
  solvents: SolventRequest[];
  reactive: string;
}

export interface MaterialRequest {
  quantity: number;
  material: string;
}

export interface Request {
  
  requestantUser: string;
  assignedUser: string;
  description: string;
  creationDate: Date;
  usageDate: Date;
  lab?: Number;
  type: string;
  studentsNumber: number;
  building?: string;
  groupNumber: number;
  observations?: string;
  subject: string;
  tpNumber: number;
  messages: string;
  equipments: string[];
  reactives: string[];
  materials: string[];
  requestNumber: number;
  isCompleted:  boolean;
  isRejected:  boolean;
  isExpired: boolean;
}