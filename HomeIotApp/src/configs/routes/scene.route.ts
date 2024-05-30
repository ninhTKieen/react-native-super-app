import { NavigatorScreenParams } from '@react-navigation/native';
import { IDevice } from '@src/features/devices/device.model';
import {
  ICreateMomentAction,
  ICreateSceneCondition,
  ISceneAction,
  ISceneCondition,
  IUpdateMomentAction,
} from '@src/features/scenes/scene.model';

export type SceneRouteStackParamList = {
  MainScene: undefined;
  MomentScene: NavigatorScreenParams<MomentStackParamList>;
  AutomationScene: NavigatorScreenParams<AutomationStackParamList>;
};

export type MomentStackParamList = {
  CreateMomentStack:
    | NavigatorScreenParams<CreateMomentStackParamList>
    | undefined;
  UpdateMomentStack:
    | NavigatorScreenParams<UpdateMomentStackParamList>
    | undefined;
};

export type CreateMomentStackParamList = {
  CreateMoment: undefined;
  CreateMomentAction: {
    type: 'RUN_DEVICE' | 'DELAY' | 'SELECT_AUTO';
    actionValues: ICreateMomentAction[];
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  CreateMomentSelectDeviceFunction: {
    device: IDevice;
    mode?: 'CREATE' | 'UPDATE';
  };
  CreateMomentChangeDeviceFunction: {
    action: ICreateMomentAction;
    currentIndex?: number;
  };
};

export type UpdateMomentStackParamList = {
  UpdateMoment: {
    sceneId: number;
    estateId: number;
  };
  UpdateMomentAction: {
    type: 'RUN_DEVICE' | 'DELAY' | 'SELECT_AUTO';
    actionValues: IUpdateMomentAction[] | ICreateMomentAction[];
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  UpdateMomentEditDeviceFunction: {
    action: IUpdateMomentAction | ICreateMomentAction;
    currentIndex?: number;
  };
  UpdateMomentSelectDeviceFunction: {
    device: IDevice;
    mode?: 'CREATE' | 'UPDATE';
  };
};

export type CreateAutomationStackParamList = {
  CreateAutomation: undefined;
  CreateAddCondition: {
    type: 'SCHEDULE' | 'WEATHER_CHANGES' | 'DEVICE_CHANGES';
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  CreateSelectDeviceConditionFunc: {
    device: IDevice;
  };
  CreateEditDeviceConditionFunc: {
    condition: ICreateSceneCondition;
    currentIndex?: number;
  };
  CreateEditDeviceActionFunc: {
    action: ICreateMomentAction;
    currentIndex?: number;
  };
  CreateAutomationAction: {
    type: 'RUN_DEVICE' | 'DELAY' | 'SELECT_AUTO';
    actionValues: ICreateMomentAction[];
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  CreateSelectDeviceActionFunction: {
    device: IDevice;
  };
};

export type UpdateAutomationStackParamList = {
  UpdateAutomation: {
    sceneId: number;
  };
  UpdateAddCondition: {
    type: 'SCHEDULE' | 'WEATHER_CHANGES' | 'DEVICE_CHANGES';
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  UpdateSelectDeviceConditionFunc: {
    device: IDevice;
  };
  UpdateEditDeviceConditionFunc: {
    condition: ICreateSceneCondition | ISceneCondition;
    currentIndex?: number;
  };
  UpdateEditDeviceActionFunc: {
    action: ICreateMomentAction | ISceneAction;
    currentIndex?: number;
  };
  UpdateAutomationAction: {
    type: 'RUN_DEVICE' | 'DELAY' | 'SELECT_AUTO';
    actionValues: ICreateMomentAction[] | IUpdateMomentAction[];
    currentIndex?: number;
    mode?: 'CREATE' | 'EDIT' | 'UPDATE';
  };
  UpdateSelectDeviceActionFunction: {
    device: IDevice;
  };
};

export type AutomationStackParamList = {
  GetAutomations: undefined;
  CreateAutomationStack:
    | NavigatorScreenParams<CreateAutomationStackParamList>
    | undefined;
  UpdateAutomationStack:
    | NavigatorScreenParams<UpdateAutomationStackParamList>
    | undefined;
};
