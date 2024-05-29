import {
  IHttpResponse,
  IHttpResponseList,
  TBaseGetParams,
} from '@src/common/common.model';
import httpUtil from '@src/utils/http.util';

import {
  IAddMemberToHome,
  IAddRoomToHome,
  ICreateHome,
  IGetAllHomeResponse,
  IGetOneHomeResponse,
  IGetRoomFromHome,
  IUpdateHome,
  IUpdateRoom,
  TMemberRole,
  TMemberStatus,
} from './home.model';

class HomeService {
  async getAllHomes() {
    const response = await httpUtil.request<
      IHttpResponseList<IGetAllHomeResponse>
    >({
      url: '/api/estates',
      method: 'GET',
    });

    return response.data;
  }

  async createHome(data: ICreateHome) {
    if (data.imageFileUrls) {
      const imgsResponse = await httpUtil.uploadListImage({
        files: data.imageFileUrls,
      });
      data.imageFileUrls = imgsResponse.data.map((img: any) => img.url);
      data.imageFileIds = imgsResponse.data.map((img: any) => img.publicId);
    }

    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: '/api/estates',
      method: 'POST',
      data,
    });

    return response.data;
  }

  async updateHome(payload: { id: number; data: IUpdateHome }) {
    const { data } = payload;

    if (data.imageFileUrls) {
      const urlImages = data.imageFileUrls.filter(
        (img: any) => typeof img === 'string',
      );
      const objImages = data.imageFileUrls.filter(
        (img: any) => typeof img !== 'string',
      );
      if (objImages?.length) {
        const imgsResponse = await httpUtil.uploadListImage({
          files: objImages,
        });
        data.imageFileUrls = [
          ...(urlImages || []),
          ...imgsResponse.data.map((img: any) => img.url),
        ];
        data.imageFileIds = [
          ...(data.imageFileIds || []),
          ...imgsResponse.data.map((img: any) => img.publicId),
        ];
      }
    }

    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${payload.id}`,
      method: 'PATCH',
      data: payload.data,
    });

    return response.data;
  }

  async deleteHome(id: number) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${id}`,
      method: 'DELETE',
    });

    return response.data;
  }

  async getHomeById(id: number) {
    const response = await httpUtil.request<IHttpResponse<IGetOneHomeResponse>>(
      {
        url: `/api/estates/${id}`,
        method: 'GET',
      },
    );

    return response.data;
  }

  async addMemberToHome(homeId: number, data: IAddMemberToHome) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${homeId}/members`,
      method: 'POST',
      data,
    });

    return response.data;
  }

  async deleteMemberFromHome(homeId: number, userId: number) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${homeId}/members`,
      method: 'DELETE',
      params: {
        userId,
      },
    });

    return response.data;
  }

  async updateHomeMember(
    estateId: number,
    userId: number,
    data: {
      nickname?: string;
      role?: TMemberRole;
    },
  ) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/members`,
      params: {
        userId,
      },
      data,
      method: 'PATCH',
    });

    return response.data;
  }

  async updateHomeMemberStatus(
    estateId: number,
    userId: number,
    status: TMemberStatus,
  ) {
    const response = await httpUtil.request<IHttpResponse<boolean>>({
      url: `/api/estates/${estateId}/members/status`,
      params: {
        userId,
      },
      data: {
        status,
      },
      method: 'PATCH',
    });

    return response.data;
  }

  async getRoomFromHome(homeId: number, params?: TBaseGetParams) {
    const response = await httpUtil.request<
      IHttpResponseList<IGetRoomFromHome>
    >({
      url: `/api/estates/${homeId}/areas`,
      method: 'GET',
      params,
    });

    return response.data;
  }

  async addRoomToHome(homeId: number, data: IAddRoomToHome) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${homeId}/areas`,
      method: 'POST',
      data,
    });

    return response.data;
  }

  async updateRoom(homeId: number, roomId: number, data: IUpdateRoom) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${homeId}/areas/${roomId}`,
      method: 'PATCH',
      data,
    });

    return response.data;
  }

  async deleteRoomFromHome(homeId: number, roomId: number) {
    const response = await httpUtil.request<IHttpResponseList<boolean>>({
      url: `/api/estates/${homeId}/areas/${roomId}`,
      method: 'DELETE',
    });

    return response.data;
  }
}

export const checkMemberPermission = (
  role: TMemberRole,
  targetRole: TMemberRole,
) => {
  const roleOrder: TMemberRole[] = ['OWNER', 'MANAGER', 'MEMBER'];

  return roleOrder.indexOf(role) <= roleOrder.indexOf(targetRole);
};

export default new HomeService();
