export type Class = {
  classId: string;
  className: string;
  intructorId: string;
  startDate: date;
  endDate: date;
  time: string;
  status: 'Fresher' | 'Offline fee-fresher' | 'Online fee-fresher' | 'Intern';
  semester?: any;
};
