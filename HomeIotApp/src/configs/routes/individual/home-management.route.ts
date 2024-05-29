import {
  IGetOneHomeResponse,
  TMemberRole,
  TMemberStatus,
} from '@src/features/home/home.model';

export type HomeManagementRouteStackParamList = {
  MainHomeManagement: {
    userId: number;
  };
  CreateHome: {
    userId: number;
  };
  JoinHome: undefined;
  HomeSettings: {
    id: number;
    userId: number;
  };
  UpdateHome: {
    home: IGetOneHomeResponse;
  };
  RoomManagement: {
    homeId: number;
    areas: {
      id: number;
      name: string;
      description?: string;
      imageUrls?: string[];
    }[];
  };
  HomeMember: {
    currentUserRole: TMemberRole;
    homeId: number;
    member: {
      nickname?: string;
      account: string;
      userId: number;
      role: TMemberRole;
      status: TMemberStatus;
    };
  };
};
