import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from 'react-native-modalfy';

import ErrorModal from './error-modal';
import SelectListModal, {SelectListModalProps} from './select-list-modal';
import AddVariationModal, {AddVariationModalProps} from './add-variation-modal';
import LoadingModal from './loading-modal';
import DialogModal, {IDialogModalProps} from './dialog-modal';

const modalStackConfig: ModalStackConfig = {
  ErrorModal: ErrorModal,
  // Add more modals here
  SelectListModal: SelectListModal,
  AddVariationModal,
  LoadingModal: LoadingModal,
  DialogModal: DialogModal,
};

const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
};

const stack = createModalStack<ModalStackParamsList>(
  modalStackConfig,
  defaultOptions,
);

export default stack;
export interface ModalStackParamsList {
  ErrorModal: {message: string};
  SelectListModal: SelectListModalProps;
  AddVariationModal: AddVariationModalProps;
  LoadingModal: undefined;
  DialogModal: IDialogModalProps;
}
