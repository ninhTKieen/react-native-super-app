import {ImageProps} from '@/components/modals/choose-image-modal';
import {HOST_SERVER} from '@env';
import axios from 'axios';

class fileApi {
  apiEndPoint: string;
  constructor() {
    this.apiEndPoint = HOST_SERVER;
  }
  async uploadFile(image: any): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/FileUpload/UploadFile`;
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

  async uploadListFile(files: any): Promise<any> {
    try {
      const url = `${this.apiEndPoint}/FileUpload/UploadBatchFile`;
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
}

export default new fileApi();
