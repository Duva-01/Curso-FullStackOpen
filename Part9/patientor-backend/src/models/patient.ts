import { Entry } from './entry';

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];  
  };

  export type PublicPatient = Omit<Patient, 'ssn'>;

  