import { IAssessmentScheme, SyllabusDetailsState } from '@/types/SyllabusDetails';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const mockContent = [
  {
    trainingProgramUnitModel: {
      unitName: 'Java cơ bản',
      description: 'Khóa học java cơ bản',
      time: 10,
      status: 'string',
      syllabusId: 1,
    },
    createLearningObjects: [
      {
        learningObjModel: {
          name: 'cách khai báo biếnnn',
          trainingTime: '2024-03-14T09:22:02.325Z',
          method: true,
          status: 'string',
          deliveryType: 'lab',
          outputStandardId: 1,
          duration: '30',
        },
      },
      {
        learningObjModel: {
          name: 'cách check valueee',
          trainingTime: '2024-03-14T09:22:02.325Z',
          method: true,
          status: 'string',
          deliveryType: 'lab',
          outputStandardId: 1,
          duration: '30',
        },
      },
    ],
  },
];
const initialState: SyllabusDetailsState = {
  data: undefined,
  createTrainingProgramUnits: [],
  assessmentSchemeSyllabusModels: [],
};

export const syllabusDetailsSlice = createSlice({
  name: 'syllabusDetails',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.data = {
        ...action.payload,
        unit: action.payload.unit.filter((unit: any) => (unit.status != "Inactive"))
      };
      state.data.unit.forEach((unit: any) => {
        unit.learningObjs = unit.learningObjs.filter((obj: any) => obj.status !== "Inactive");
      });
      console.log(state.data);
    },
    setCreateTrainingProgramUnits: (state, action: PayloadAction<any>) => {
      state.createTrainingProgramUnits = action.payload;
    },

    addSlot: (
      state,
      action: PayloadAction<{
        unitId: number;
        unitName: string;
        description: string;
      }>,
    ) => {
      state.createTrainingProgramUnits.push({
        trainingProgramUnitModel: {
          unitId: action.payload.unitId,
          unitName: action.payload.unitName,
          description: action.payload.description,
          time: 0,
          status: 'Actice',
          syllabusId: state.data.syllabusId,
        },
        createLearningObjects: [],
      });
    },
    updateSlotByIndex: (
      state,
      action: PayloadAction<{
        index: number;
        unitName: string;
        description: string;
      }>,
    ) => {
      state.createTrainingProgramUnits[action.payload.index].trainingProgramUnitModel.unitName = action.payload.unitName;
      state.createTrainingProgramUnits[action.payload.index].trainingProgramUnitModel.description = action.payload.description;
    },
    deleteSlotByIndex: (state, action: PayloadAction<number>) => {
      const unitIndexToDelete = action.payload;
      const newCreateTrainingProgramUnits = state.createTrainingProgramUnits.map((unit, index) => {
        if (index === unitIndexToDelete) {
          return {
            ...unit,
            trainingProgramUnitModel: {
              ...unit.trainingProgramUnitModel,
              status: 'Inactive',
            },
          };
        }
        return unit;
      });
      state.createTrainingProgramUnits = newCreateTrainingProgramUnits;
    },
    addLearningObjects: (
      state,
      action: PayloadAction<{
        unitIndex: number;
        learningObjModel: {
          learningObjId: number;
          name: string;
          trainingTime: string;
          method: boolean;
          status: string;
          deliveryType: string;
          duration: string;
          outputStandardId: number;
        };
      }>,
    ) => {
      console.log(state.createTrainingProgramUnits[action.payload.unitIndex]);
      state.createTrainingProgramUnits[action.payload.unitIndex].createLearningObjects.push({
        learningObjModel: {
          learningObjId: 0,
          unitId: 0,
          name: action.payload.learningObjModel.name,
          trainingTime: action.payload.learningObjModel.trainingTime,
          method: action.payload.learningObjModel.method,
          status: action.payload.learningObjModel.status,
          deliveryType: action.payload.learningObjModel.deliveryType,
          duration: action.payload.learningObjModel.duration,
          outputStandardId: action.payload.learningObjModel.outputStandardId,
        },
        materialModels: [],
      });
    },
    updateLearningObjectsByIndex: (
      state,
      action: PayloadAction<{
        unitIndex: number;
        learningObjIndex: number;
        learningObjModel: {
          learningObjId: number;
          name: string;
          trainingTime: string;
          method: boolean;
          status: string;
          deliveryType: string;
          duration: string;
          outputStandardId: number;
        };
      }>,
    ) => {
      console.log(action.payload);
      console.log(state.createTrainingProgramUnits[action.payload.unitIndex]);

      const { unitIndex, learningObjIndex, learningObjModel } = action.payload;

      // Find the training program unit at the specified unitIndex
      const unit = state.createTrainingProgramUnits[unitIndex];

      // If the unit exists, update the learning object at the specified learningObjIndex
      if (unit) {
        unit.createLearningObjects[learningObjIndex] = {
          learningObjModel: {
            ...unit.createLearningObjects[learningObjIndex]?.learningObjModel,
            learningObjId: unit.createLearningObjects[learningObjIndex]?.learningObjModel?.learningObjId || 0,
            name: learningObjModel.name,
            trainingTime: learningObjModel.trainingTime,
            method: learningObjModel.method,
            status: learningObjModel.status,
            deliveryType: learningObjModel.deliveryType,
            duration: learningObjModel.duration,
            outputStandardId: learningObjModel.outputStandardId,
          },
          materialModels: [
            ...unit.createLearningObjects[learningObjIndex].materialModels
          ],
        };
      }
    },
    deleteLearningObjectsByIndex: (
      state,
      action: PayloadAction<{
        unitIndex: number;
        learningObjIndex: number;
      }>,
    ) => {
      console.log(action.payload);
      console.log(state.createTrainingProgramUnits[action.payload.unitIndex]);

      const { unitIndex, learningObjIndex } = action.payload;

      // Find the training program unit at the specified unitIndex
      const unit = state.createTrainingProgramUnits[unitIndex];

      // If the unit exists, filter out the learning object at the specified learningObjIndex
      if (unit) {
        const updatedLearningObjects = unit.createLearningObjects.map((learningObj, index) => {

          if (index == learningObjIndex) {
            return {
              learningObjModel: {
                ...learningObj.learningObjModel,
                status: 'Inactive',
              },
              materialModels: learningObj.materialModels,
            };
          }
          return learningObj;

        });

        // Update the createLearningObjects array of the unit with the filtered array
        unit.createLearningObjects = updatedLearningObjects;
      }
    },
    setAssessmentScheme: (state, action: PayloadAction<IAssessmentScheme[]>) => {
      state.assessmentSchemeSyllabusModels = action.payload;
    },
    updateAssessmentScheme: (state, action: PayloadAction<IAssessmentScheme>) => {
      const updatedAssessmentScheme = state.assessmentSchemeSyllabusModels.map((item) => {
        if (item.assessmentSchemeId == action.payload.assessmentSchemeId) {
          console.log(action.payload);
          return action.payload;
        }
        return item;
      });

      // if schema not exist in list, add new schema
      if (!updatedAssessmentScheme.find((item) => item.assessmentSchemeId == action.payload.assessmentSchemeId)) {
        updatedAssessmentScheme.push(action.payload);
      }

      state.assessmentSchemeSyllabusModels = updatedAssessmentScheme;
    },
    addMaterial: (state, action: PayloadAction<{
      unitIndex: number;
      contentIndex: number;
      name: string;
      url: string;
      authorName: string;
    }>) => {
      const { unitIndex, contentIndex, name, url, authorName} = action.payload;

      state.createTrainingProgramUnits[unitIndex].createLearningObjects[contentIndex].materialModels.push({
        materialId: 0,
        name,
        createBy: authorName,
        createDate: (new Date()).toISOString(),
        url,
      });
    },
    deleteMaterial: (state, action: PayloadAction<{
      unitIndex: number;
      contentIndex: number;
      materialIndex: number;
    }>) => {
      const { unitIndex, contentIndex, materialIndex } = action.payload;

      state.createTrainingProgramUnits[unitIndex].createLearningObjects[contentIndex].materialModels.splice(materialIndex, 1);
    }
  },
});

export const {
  set,
  setAssessmentScheme,
  addSlot,
  deleteSlotByIndex,
  updateSlotByIndex,
  addLearningObjects,
  deleteLearningObjectsByIndex,
  updateLearningObjectsByIndex,
  setCreateTrainingProgramUnits,
  updateAssessmentScheme,
  addMaterial,
  deleteMaterial
} = syllabusDetailsSlice.actions;

export default syllabusDetailsSlice.reducer;
