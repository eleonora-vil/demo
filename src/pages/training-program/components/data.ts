import { UserViewProgram } from '@/types/userViewProgram';

// export const MOCK_DATA_USER: UserViewProgram[] = [
//   {
//     id: "1",
//     programName: "C# basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Active"
//   },
//   {
//     id: "2",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Draft"
//   },
//   {
//     id: "3",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Inactive"
//   },
//   {
//     id: "4",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "5",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   }, {
//     id: "6",
//     programName: "C# basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Draft"
//   },
//   {
//     id: "7",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Active"
//   },
//   {
//     id: "8",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Draft"
//   },
//   {
//     id: "9",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "10",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   },
//   {
//     id: "1",
//     programName: "C# basic program basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Active"
//   },
//   {
//     id: "2",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Draft"
//   },
//   {
//     id: "3",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Inactive"
//   },
//   {
//     id: "4",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "5",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   }, {
//     id: "6",
//     programName: "C# basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Draft"
//   },
//   {
//     id: "7",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Active"
//   },
//   {
//     id: "8",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Draft"
//   },
//   {
//     id: "9",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "10",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   },
//   {
//     id: "1",
//     programName: "C# basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Active"
//   },
//   {
//     id: "2",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Draft"
//   },
//   {
//     id: "3",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Inactive"
//   },
//   {
//     id: "4",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "5",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   }, {
//     id: "6",
//     programName: "C# basic program",
//     createOn: "21/07/2019",
//     createBy: "Warrior Tran",
//     duration: 2,
//     status: "Draft"
//   },
//   {
//     id: "7",
//     programName: ".NET basic program",
//     createOn: "07/10/2021",
//     createBy: "Warrior Tran",
//     duration: 12,
//     status: "Active"
//   },
//   {
//     id: "8",
//     programName: "DevOps Foundation",
//     createOn: "10/11/2021",
//     createBy: "Mong Quynh",
//     duration: 25,
//     status: "Draft"
//   },
//   {
//     id: "9",
//     programName: "DevOps Foundation_2",
//     createOn: "20/05/2029",
//     createBy: "Warrior Tran",
//     duration: 24,
//     status: "Active"
//   },
//   {
//     id: "10",
//     programName: ".NET basic program_3",
//     createOn: "30/03/2022",
//     createBy: "John Hubble",
//     duration: 13,
//     status: "Active"
//   },
// ]
