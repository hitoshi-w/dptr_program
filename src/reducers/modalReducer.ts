import { Task } from 'reducers/taskReducer';

interface Modal {
  isOpen: boolean;
  task: Task | null;
}

interface ModalState {
  modal: Modal;
}

const initModal: ModalState = {
  modal: { isOpen: false, task: null },
};

//actions
export const ModalActions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
} as const;

//action creators
export const openModal = (task: Task) => ({
  type: ModalActions.OPEN_MODAL as typeof ModalActions.OPEN_MODAL,
  payload: task,
});

export const closeModal = () => ({
  type: ModalActions.CLOSE_MODAL as typeof ModalActions.CLOSE_MODAL,
});

//action types
export type ModalActionTypes =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;

//reducer
export const modalReducer = (
  state = initModal,
  action: ModalActionTypes,
): ModalState => {
  switch (action.type) {
    case ModalActions.OPEN_MODAL:
      return { modal: { isOpen: true, task: action.payload } };
    case ModalActions.CLOSE_MODAL:
      return { modal: { isOpen: false, task: null } };
    default:
      return state;
  }
};
