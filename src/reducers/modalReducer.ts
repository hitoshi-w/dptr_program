interface Modal {
  isOpen: boolean;
  taskId: string | null;
}

interface ModalState {
  modal: Modal;
}

const initModal: ModalState = {
  modal: { isOpen: false, taskId: null },
};

//actions
export const ModalActions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
} as const;

//action creators
export const openModal = (id: string) => ({
  type: ModalActions.OPEN_MODAL as typeof ModalActions.OPEN_MODAL,
  payload: id,
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
      return { modal: { isOpen: true, taskId: action.payload } };
    case ModalActions.CLOSE_MODAL:
      return { modal: { isOpen: false, taskId: null } };
    default:
      return state;
  }
};
