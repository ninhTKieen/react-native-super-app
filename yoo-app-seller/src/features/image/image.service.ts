import {ImageProps} from '@/components/modals/choose-image-modal';
import {HOST_SERVER} from '@env';
import axios from 'axios';

class ImageApi {
  apiEndPoint: string;
  constructor() {
    this.apiEndPoint = HOST_SERVER;
  }
  async uploadImage(image: any): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/UploadImagePublic`;
      const formData = new FormData();

      formData.append('file', {
        name: image.name,
        type: image.mime,
        uri: image.uri,
        size: image.size,
        height: image.height,
        width: image.width,
      });

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async uploadImages(files: any): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/UploadListImagePublic`;
      const formData = new FormData();

      files.forEach((image: any) => {
        formData.append('file', {
          name: image.name,
          type: image.mime,
          uri: image.uri,
          size: image.size,
          height: image.height,
          width: image.width,
        });
      });

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async uploadListImageStore(files: ImageProps[]): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/UploadListImagePublic`;
      const formData = new FormData();

      files.forEach((image: ImageProps) => {
        formData.append('file', image);
      });

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async uploadAvatar(image: ImageProps): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/UploadImagePublic`;
      const formData = new FormData();

      formData.append('file', image);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new ImageApi();
