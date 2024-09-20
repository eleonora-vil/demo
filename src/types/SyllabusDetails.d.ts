export interface SyllabusDetailsState {
  data: any;
  createTrainingProgramUnits: ICreateTrainingProgramUnits[];
  assessmentSchemeSyllabusModels: IAssessmentScheme[];
}

export interface IAssessmentScheme {
  assessmentSchemeId: number;
  syllabusId: number;
  percentMark: number;
  assessmentSchemeName: string;
}
export interface ICreateTrainingProgramUnits {
  trainingProgramUnitModel: IAddSlot;
  createLearningObjects: ILearningObjModel[];
}

export interface ILearningObjModel {
  learningObjModel: {
    learningObjId: number;
    name: string;
    trainingTime: string;
    method: boolean;
    status: string;
    deliveryType: string;
    duration: string;
    outputStandardId: number;
    unitId: number;
  };
  materialModels: 
    {
      materialId: number;
      name: string;
      createBy: string;
      createDate: string;
      url: string;
    }[]
}
[];

export interface IAddSlot {
  unitId: number;
  unitName: string;
  description: string;
  time: number;
  status: string;
  syllabusId: number;
}
