import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const createYupSchema = (configData: any[]) => {
  const schema: any = {};

  configData.forEach(item => {
    switch (item.type) {
      case 'object':
        const subSchema: any = {};
        item.properties.forEach((val: any) => {
          switch (val.type) {
            case 'string':
            case 'email':
            case 'phone':
            case 'date':
              subSchema[val.id] = yup.string();
              break;
            case 'number':
              subSchema[val.id] = yup.number();
              break;
            // case 'date':
            //   subSchema[val.id] = yup.date();
            //   break;
          }
          if (val.required) {
            subSchema[val.id] = subSchema[val.id].required();
          }
          if (val.validations?.email) {
            subSchema[val.id] = subSchema[val.id].email();
          }
        });
        schema[item.id] = yup.object(subSchema);
        break;
      case 'arrayObject':
        const subSchemaArray: any = {};
        item.properties.forEach((val: any) => {
          switch (val.type) {
            case 'string':
            case 'email':
            case 'phone':
            case 'date':
              subSchemaArray[val.id] = yup.string();
              break;
            case 'number':
              subSchemaArray[val.id] = yup.number();
              break;
            // case 'date':
            //   subSchemaArray[val.id] = yup.date();
            //   break;
          }
          if (val.required) {
            subSchemaArray[val.id] = subSchemaArray[val.id].required();
          }
          if (val.validations?.email) {
            subSchemaArray[val.id] = subSchemaArray[val.id].email();
          }
        });
        schema[item.id] = yup.array().of(yup.object(subSchemaArray)).min(1);
        break;
      case 'string':
      case 'email':
      case 'phone':
      case 'date':
        schema[item.id] = yup.string();
        break;
      case 'number':
        schema[item.id] = yup.number();
        break;
      case 'date':
        schema[item.id] = yup.date();
        break;
      default:
        schema[item.id] = yup.string();
        break;
    }
  });
  return yup.object(schema);
};
