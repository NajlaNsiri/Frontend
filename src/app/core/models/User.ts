import { Role } from "./Role";

// models/user.model.ts
export class User {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber:string;
    genre: string;
    active: boolean;
    roles: Role[];  
    constructor(
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string,
      phoneNumber:string,
      genre: string,
      active: boolean,
      roles: Role[],
      id?: number
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.password = password;
      this.phoneNumber= phoneNumber;
      this.genre = genre;
      this.active = active;
      this.roles = roles;
    }
  }
  