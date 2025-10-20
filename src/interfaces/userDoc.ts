import { Timestamp } from "firebase/firestore";

interface UserDocType {
  uid: string;
  names: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    allLastNames?: string;
    displayName: string;
    initials?: string;
  };
  personType?: string;
  documents: {
    cpf?: string;
    cnpj?: string;
    studentId?: string;
  };
  photos: {
    mediumUrl?: string | null;
    smallUrl?: string | null;
    thumbUrl?: string | null;
  };
  email: string;
  phone: string;
  createdAt: Timestamp;
  role: string;
  isActive?: boolean;
}

export default UserDocType;
