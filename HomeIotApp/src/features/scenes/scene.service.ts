import { IHttpResponse, INewHttpResponseList } from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';
import _ from 'lodash';

import {
  IAutomationSceneGetAll,
  IAutomationSceneGetById,
  ICreateAutomationScene,
  ICreateMomentScene,
  IMomentSceneGetAll,
  IMomentSceneGetById,
  ISceneAction,
  IUpdateAutomationScene,
  IUpdateMomentAction,
  IUpdateMomentScene,
} from './scene.model';

class SceneService {
  async getAllMomentsScene(estateId: number) {
    const response = await httpUtil.request<
      INewHttpResponseList<IMomentSceneGetAll>
    >({
      url: `/api/estates/${estateId}/scenes/moments`,
      method: 'GET',
    });

    return response.data;
  }

  async getMomentSceneById(params: { estateId: number; sceneId: number }) {
    const response = await httpUtil.request<IHttpResponse<IMomentSceneGetById>>(
      {
        url: `/api/estates/${params.estateId}/scenes/moments/${params.sceneId}`,
        method: 'GET',
      },
    );

    return response.data;
  }

  async createMomentScene(estateId: number, data: ICreateMomentScene) {
    data.actions = data.actions.map((action, actionIndex) => {
      return {
        ...action,
        index: actionIndex + 1,
      };
    });
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/moments`,
      method: 'POST',
      data,
    });

    return response.data;
  }

  async updateMomentScene(
    estateId: number,
    sceneId: number,
    data: IUpdateMomentScene,
  ) {
    data.actions = data.actions.map((action: any, actionIndex) => {
      const updateAction = _.omit(action, ['momentSceneId']);
      return {
        ...(updateAction as IUpdateMomentAction),
        index: actionIndex + 1,
      };
    });

    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/moments/${sceneId}`,
      method: 'PATCH',
      data,
    });

    return response.data;
  }

  async executeMomentScene(estateId: number, sceneId: number) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/moments/${sceneId}/execute`,
      method: 'POST',
    });

    return response.data;
  }

  async deleteMomentScene(estateId: number, sceneId: number) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/moments/${sceneId}`,
      method: 'DELETE',
    });

    return response.data;
  }

  async getAllAutomationsScene(estateId: number) {
    const response = await httpUtil.request<
      INewHttpResponseList<IAutomationSceneGetAll>
    >({
      url: `/api/estates/${estateId}/scenes/automations`,
      method: 'GET',
    });

    return response.data;
  }

  async getAutomationSceneById(params: { estateId: number; sceneId: number }) {
    const response = await httpUtil.request<
      IHttpResponse<IAutomationSceneGetById>
    >({
      url: `/api/estates/${params.estateId}/scenes/automations/${params.sceneId}`,
      method: 'GET',
    });

    return response.data;
  }

  async createAutomationScene(estateId: number, data: ICreateAutomationScene) {
    data.actions = data.actions.map((action, actionIndex) => {
      const newAction = _.omit(action, ['compare']);

      return {
        ...(newAction as ISceneAction),
        index: actionIndex + 1,
      };
    });
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/automations`,
      method: 'POST',
      data,
    });

    return response.data;
  }

  async updateAutomationScene(
    estateId: number,
    sceneId: number,
    data: IUpdateAutomationScene,
  ) {
    delete (data as any).id;
    delete (data as any).estateId;

    data.actions = data.actions.map((action, actionIndex) => {
      const updateAction = _.omit(action, [
        'momentSceneId',
        'doAutomationSceneId',
        'doMomentSceneId',
        'automationSceneId',
      ]);
      return {
        ...(updateAction as ISceneAction),
        index: actionIndex + 1,
      };
    });
    data.conditions = data.conditions.map((condition) => {
      const updateCondition = _.omit(condition, ['automationSceneId']);
      return updateCondition;
    });

    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/automations/${sceneId}`,
      method: 'PATCH',
      data,
    });

    return response.data;
  }

  async updateAutomationSceneState(
    estateId: number,
    sceneId: number,
    data: { enabled: boolean },
  ) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/automations/${sceneId}/enabled`,
      method: 'PATCH',
      data,
    });

    return response.data;
  }

  async deleteAutomationScene(estateId: number, sceneId: number) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/scenes/automations/${sceneId}`,
      method: 'DELETE',
    });

    return response.data;
  }
}

export default new SceneService();
