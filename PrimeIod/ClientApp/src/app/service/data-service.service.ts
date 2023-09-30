import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor() {}
}
// users: Array<any> = [
//   {
//     id: 1,
//     fName: 'Akash',
//     lName: 'Konnur',
//     email: 'akash.m.konnur@gmail.com',
//     employeeId: 10,
//     roles: [{ id: 1, name: 'admin' }, { id: 2, name: 'manager' }]
//   },
//   {
//     id: 2,
//     fName: 'Lawrence',
//     lName: 'Taur',
//     email: 'lawrence.taur@claritytechnologies.com',
//     employeeId: 20,
//     roles: [{ id: 1, name: 'admin' }]
//   },
//   {
//     id: 3,
//     fName: 'Surekha',
//     lName: 'Bedakihal',
//     email: 'surekha.Bedakihal@claritytechnologies.com',
//     employeeId: 30,
//     roles: [{ id: 1, name: 'admin' }, { id: 2, name: 'manager' }, { id: 3, name: 'user' }]
//   },
//   {
//     id: 4,
//     fName: 'Pradeep',
//     lName: 'Chavan',
//     email: 'pradeep.chavan@claritytechnologies.com',
//     employeeId: 40,
//     roles: [{ id: 3, name: 'user' }]
//   },
//   {
//     id: 5,
//     fName: 'Guru',
//     lName: 'Sharan',
//     email: 'guru.sharan@claritytechnologies.com',
//     employeeId: 50,
//     roles: [{ id: 2, name: 'manager' }, { id: 3, name: 'user' }]
//   }
// ];

// departments: Array<any> = [
//   { id: 1, name: 'Quality', manager: 1, users: [{ id: 3, fName: 'Surekha' }, { id: 4, fName: 'Pradeep' }] },
//   { id: 2, name: 'Finance', manager: 3, users: [{ id: 3, fName: 'Pradeep' }, { id: 5, fName: 'Guru' }] },
//   { id: 3, name: 'HumanResource', manager: 1, users: [{ id: 5, fName: 'Guru' }, { id: 4, fName: 'Pradeep' }] },
//   {
//     id: 4,
//     name: 'Maintainance',
//     manager: 5,
//     users: [{ id: 3, fName: 'Surekha' }, { id: 4, fName: 'Pradeep' }, { id: 5, fName: 'Guru' }]
//   },
//   { id: 5, name: 'TE-OEA', manager: 5, users: [{ id: 3, fName: 'Surekha' }] }
// ];

// roles: Array<any> = [
//   {
//     id: 1,
//     name: 'admin'
//   },
//   {
//     id: 2,
//     name: 'manager'
//   },
//   {
//     id: 3,
//     name: 'user'
//   }
// ];
