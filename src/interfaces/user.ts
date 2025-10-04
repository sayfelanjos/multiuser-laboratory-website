import React from "react";
import { Timestamp } from "firebase/firestore";

// interface User {
//   key: React.Key;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

interface UserType {
  uid?: React.Key;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  allLastNames?: string;
  displayName?: string;
  initials?: string;
  email?: string;
  phone?: string;
  createdAt?: Timestamp;
  role?: string;
  photoURL?: string | null;
  personType?: string;
  cpf?: string;
  cnpj?: string;
  studentId?: string;
  isActive?: boolean;
}

export default UserType;
