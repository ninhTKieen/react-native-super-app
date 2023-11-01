import {
  ICreateItem,
  IItem,
  IListItem,
  ItemAttribute,
  ItemCategory,
  ItemCategoryNode,
} from './item.model';
import httpUtil, {axiosMethod} from '@/utils/http.util';

class ItemServices {
  async getAll(params: {
    providerId: number;
    skipCount?: number;
    formId?: number;
    search?: string;
    orderBy?: number;
    IsItemBooking?: boolean;
  }): Promise<IListItem> {
    const url = '/api/services/app/Item/GetAllItemsByPartner';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });
    return {
      totalRecords: response.result.totalRecords,
      items: response.result.data,
    };
  }

  private formatDataCategory(
    categories: Array<ItemCategory>,
  ): Array<ItemCategoryNode> {
    if (categories === null || categories.length === 0) {
      return [];
    }

    const nodes = [];
    let items = categories.filter(
      item =>
        item.parentId === 0 ||
        item.parentId === null ||
        item.parentId === undefined,
    );

    for (let item of items) {
      let children = categories.filter(_item => _item.parentId === item.id);
      let node = {
        data: item,
        children: this.createChildren(children, categories),
      };
      nodes.push(node);
    }

    const root = nodes;
    return root;
  }

  private createChildren(
    children: ItemCategory[],
    categories: ItemCategory[],
  ): ItemCategoryNode[] {
    const nodes = [];
    for (const child of children) {
      const _children = categories.filter(_item => _item.parentId === child.id);
      const node = {
        data: child,
        children: child.hasChildren
          ? this.createChildren(_children, categories)
          : undefined,
      };
      nodes.push(node);
    }
    return nodes;
  }

  async getCategories(params: {
    businessType?: number;
  }): Promise<Array<ItemCategoryNode>> {
    const url = '/api/services/app/Category/GetAllCategories';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });

    const formatData = this.formatDataCategory(response.result.data);
    return formatData;
  }

  async getCategoryById({id}: {id: number}): Promise<{
    id: number;
    tenantId: number;
    name: string;
    parentId: number;
    businessType: number;
    iconUrl: string;
    hasChildren: boolean;
  }> {
    const url = '/api/services/app/Category/GetCategoryById';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: {
        id,
      },
    });

    return response.result.data;
  }

  async getItemAttributes(categoryId: number): Promise<Array<ItemAttribute>> {
    const url = '/api/services/app/ItemAttribute/GetAllItemAttributes';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params: {
        categoryId,
      },
    });
    return response.result.data;
  }

  async createItem({item}: {item: ICreateItem}): Promise<any> {
    const url = '/api/services/app/Item/CreateItem';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      data: item,
    });
    return response.result;
  }

  async updateItem({item}: {item: IItem}): Promise<any> {
    const url = '/api/services/app/Item/UpdateItem';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.PUT,
      data: item,
    });
    return response.result;
  }

  async deleteItem(params: {id: number}): Promise<any> {
    const url = '/api/services/app/Item/DeleteItem';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.DELETE,
      params: params,
    });

    return response.result;
  }

  async showItem({id}: {id: number}): Promise<boolean> {
    const url = '/api/services/app/Item/ShowItem';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      params: {
        id,
      },
    });

    return response.result.success;
  }

  async hiddenItem({id}: {id: number}): Promise<boolean> {
    const url = '/api/services/app/Item/HiddenItem';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.POST,
      params: {
        id,
      },
    });

    return response.result.success;
  }
  async getItemRanking(params: {
    providerId: number;
    formId: number;
  }): Promise<any> {
    const url = '/api/services/app/Order/GetItemRanking';
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });
    return response.result.data;
  }

  async getStatisticOrders(params: {
    ProviderId: number;
    FormId: number;
    Type: number;
    DateFrom?: Date;
    DateTo?: Date;
    Year?: number;
    Month?: number;
    Day?: number;
  }): Promise<any> {
    const url = '/api/services/app/Order/GetStatisticOrders';
    console.log('Date From', params.DateFrom);
    const response = await httpUtil.request({
      url,
      method: axiosMethod.GET,
      params,
    });
    return response.result.data;
  }
}

export default new ItemServices();
