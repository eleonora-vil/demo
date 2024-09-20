import { GeneralTabData, Syllabus, Unit, Lession, SyllabusDay, OtherTabData, TrainingDeliveryPrinciple } from '@/types/syllabus';

// For Main component
export const SYLLABUS_DETAIL_EXAMPLE_DATA: any = [
  {
    syllabusId: 1,
    title: 'C# Programming Language',
    status: 'Active',
    version: 'NPL v4.0',
    createDate: new Date('2024-01-01T08:42:04.000Z'),
    updateDate: new Date('2024-02-01T08:42:04.000Z'),
    updateBy: 'Warrior Tran',
    intructorId: 1,
    instructorName: 'Warrior Tran',
  },
];

// For General Tab component
export const GENERAL_TAB_DATA: GeneralTabData[] = [
  {
    level: 'All levels',
    attendance_number: 20,
    output_standard: ['H4SD', 'K6SD', 'H6SD'],
    technical_requirements: ['Microsoft SQL Server 2005 Express', 'Microsoft Visual Studio 2017', 'Microsoft Office 2007 (Visio, Word, PowerPoint)'],
  },
];

// For Outline Tab component
export const OUTLINE_TAB_DATA: any = [
  {
    index: 1,
    title: '.NET Introduction',
    details: [
      {
        id: 1,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Online',
        delivery_type: 'lecture',
      },
      {
        id: 2,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Offline',
        delivery_type: 'lecture',
      },
      {
        id: 3,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Offline',
        delivery_type: 'lab',
      },
    ],
  },
  {
    index: 2,
    title: '.NET Introduction',
    details: [
      {
        id: 1,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Online',
        delivery_type: 'lecture',
      },
      {
        id: 2,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Offline',
        delivery_type: 'lecture',
      },
      {
        id: 3,
        title: 'Introduction to C#',
        tag: 'H4SD',
        duration: 1,
        status: 'Offline',
        delivery_type: 'lab',
      },
    ],
  },
];

// For Other Tab component
export const OTHER_TAB_DATA: OtherTabData = {
  quiz: 15,
  assignment: 15,
  final: 70,
  gpa: 70,
};

export const TRAINING_DELIVERY_PRINCIPLES: TrainingDeliveryPrinciple[] = [
  {
    icon: 'verified-user',
    title: 'Training',
    description: 'Training is the action of teaching a person a particular skill or type of behavior.',
  },
  {
    icon: 'verified-user',
    title: 'Delivery',
    description: 'The action of delivering letters, parcels, or goods.',
  },
  {
    icon: 'verified-user',
    title: 'Principle',
    description: 'A fundamental truth or proposition that serves as the foundation for a system of belief or behavior or for a chain of reasoning.',
  },
];
