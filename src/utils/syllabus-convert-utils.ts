import { IAssessmentScheme, ICreateTrainingProgramUnits } from '@/types/SyllabusDetails';

export const addIndexIntoSyllabus = (data: ICreateTrainingProgramUnits[]) => {
  return data?.map((slot, unitIndex) => {
    return {
      ...slot,
      trainingProgramUnitModel: {
        ...slot.trainingProgramUnitModel,
        index: unitIndex,
      },
      createLearningObjects: slot.createLearningObjects?.map((learningObj, contentIndex) => {
        return {
          ...learningObj,
          learningObjModel: {
            ...learningObj.learningObjModel,
            unitId: slot.trainingProgramUnitModel.unitId,
            index: contentIndex,
          },
        };
      }),
    };
  });
};
const mock = {
  unit: [
    {
      unitId: 3,
      unitName: 'Database Management Systems',
      description: 'Introduction to database systems',
      time: 2,
      syllabusId: 3,
      syllabus: null,
      learningObjs: [
        {
          learningObjId: 5,
          name: 'Implementing Test',
          trainningTime: '2024-03-16T04:42:51.688298',
          method: true,
          index: 3,
          unitId: 3,
          status: 'Active',
          deliveryType: 'lab',
          duration: '30mins',
          outputStandardId: 3,
          unit: null,
        },
      ],
    },
  ],
};
export function convertCallGetIntoRedux(mock: any): ICreateTrainingProgramUnits[] {
  const { syllabusId, unit } = mock;

  console.log(mock)

  const createTrainingProgramUnits = unit.map((u: any) => {
    const { unitId, unitName, description, time, learningObjs, status } = u;

    const createLearningObjects = learningObjs.map((lo: any) => {
      const { learningObjId, name, trainningTime, method, index, status, deliveryType, duration, outputStandardId, material } = lo;

      console.log(material)

      let filteredMaterial = material?.map((mat:any) => {
        return {
          ...mat,
          learningObjId: learningObjId,
        }
      })
      return {
        learningObjModel: {
          learningObjId,
          name,
          method,
          status,
          deliveryType,
          outputStandardId: outputStandardId,
          duration,
        },
        materialModels: filteredMaterial || [],
      };
    });

    return {
      trainingProgramUnitModel: {
        unitId,
        unitName,
        description,
        time,
        status,
        syllabusId,
      },
      createLearningObjects,
    };
  });

  // sortTrainingProgramUnits(createTrainingProgramUnits);

  return createTrainingProgramUnits;
}

export const handleAddMultipleSchema = (assessmentSchemeSyllabusModels: IAssessmentScheme[]) => {
  console.log(assessmentSchemeSyllabusModels);
};

export const sortTrainingProgramUnits = (createTrainingProgramUnits: ICreateTrainingProgramUnits[]) => {
  return createTrainingProgramUnits.sort((a, b) => a.trainingProgramUnitModel.status.localeCompare(b.trainingProgramUnitModel.status));
}