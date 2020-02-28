interface Modal {
  isOpen: boolean;
}

interface ModalState {
  modal: Modal;
}

const initModal: ModalState = {
  modal: { isOpen: false },
};

//actions
export const ModalActions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
} as const;

//action creators
export const openModal = () => ({
  type: ModalActions.OPEN_MODAL as typeof ModalActions.OPEN_MODAL,
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
      return { modal: { isOpen: true } };
    case ModalActions.CLOSE_MODAL:
      return { modal: { isOpen: false } };
    default:
      return state;
  }
};
