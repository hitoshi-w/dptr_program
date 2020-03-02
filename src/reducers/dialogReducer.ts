interface AlertDialog {
  isDialog: boolean;
  taskId: string | null;
}

interface DialogState {
  alertDialog: AlertDialog;
}

const initDialog: DialogState = {
  alertDialog: { isDialog: false, taskId: null },
};

//actions
export const DialogActions = {
  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
} as const;

//action creators
export const openDialog = (id: string) => ({
  type: DialogActions.OPEN_DIALOG as typeof DialogActions.OPEN_DIALOG,
  payload: id,
});

export const closeDialog = () => ({
  type: DialogActions.CLOSE_DIALOG as typeof DialogActions.CLOSE_DIALOG,
});

//action types
export type DialogActionTypes =
  | ReturnType<typeof openDialog>
  | ReturnType<typeof closeDialog>;

//reducer
export const dialogReducer = (
  state = initDialog,
  action: DialogActionTypes,
): DialogState => {
  switch (action.type) {
    case DialogActions.OPEN_DIALOG:
      return { alertDialog: { isDialog: true, taskId: action.payload } };
    case DialogActions.CLOSE_DIALOG:
      return { alertDialog: { isDialog: false, taskId: null } };
    default:
      return state;
  }
};
