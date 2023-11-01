export const MedicalAttributeForm = [
  {
    label: 'Personal Information',
    id: 'personalInfor',
    properties: [
      {
        id: 'name',
        type: 'string',
        label: 'Name',
        required: true,
      },
      {
        id: 'phoneNumber',
        type: 'string',
        label: 'Phone number',
        required: true,
      },
      {
        id: 'dateOfBirth',
        type: 'date',
        label: 'Date of birth',
        required: true,
      },
      {
        id: 'address',
        type: 'string',
        label: 'Address',
        required: true,
      },
      {
        id: 'email',
        type: 'string',
        label: 'Email',
        required: true,
      },
    ],
    type: 'object',
    required: true,
  },
  {
    label: 'Literacy',
    id: 'literacy',
    type: 'arrayObject',
    properties: [
      {
        id: 'dateFrom',
        type: 'date',
        label: 'dateFrom',
      },
      {
        id: 'dateTo',
        type: 'date',
        label: 'dateTo',
      },
      {
        id: 'university',
        type: 'string',
        label: 'university',
      },
      {
        id: 'major',
        type: 'string',
        label: 'major',
      },
    ],
  },
  {
    label: 'experience',
    id: 'experience',
    type: 'arrayObject',
    properties: [
      {
        id: 'dateFrom',
        type: 'date',
        label: 'dateFrom',
      },
      {
        id: 'dateTo',
        type: 'date',
        label: 'dateTo',
      },
      {
        id: 'position',
        type: 'string',
        label: 'position',
      },
      {
        id: 'company',
        type: 'string',
        label: 'company',
      },
    ],
  },
  {
    label: 'certificate',
    id: 'certificate',
    type: 'arrayObject',
    properties: [
      {
        id: 'dateFrom',
        type: 'date',
        label: 'dateFrom',
      },
      {
        id: 'dateTo',
        type: 'date',
        label: 'dateTo',
      },
      {
        id: 'name',
        type: 'string',
        label: 'name',
      },
      {
        id: 'description',
        type: 'string',
        label: 'description',
      },
    ],
  },
];

// export const useConfigAttributesConstants = (typeStore: number) => {
//   switch (typeStore) {
//     case 24:
//     case 2401:
//     case 2402:
//     case 2403:
//     case 2404:
//     case 2405:
//     case 2406:
//     case 2407:
//       return MedicalAttributeForm;
//     default:
//       return [];
//   }
// };
type AttributeMappings = {
  [key: number]: any;
};
export const useConfigAttributesConstants = (typeStore: number) => {
  const attributeMappings: AttributeMappings = {
    24: MedicalAttributeForm,
    2401: MedicalAttributeForm,
    2402: MedicalAttributeForm,
    2403: MedicalAttributeForm,
    2404: MedicalAttributeForm,
    2405: MedicalAttributeForm,
    2406: MedicalAttributeForm,
    2407: MedicalAttributeForm,
  };

  return attributeMappings[typeStore] || [];
};
