import { Task } from 'reducers/taskReducer';

interface AlertDialog {
  isDialog: boolean;
  task: Task | null;
}

interface DialogState {
  alertDialog: AlertDialog;
}

const initDialog: DialogState = {
  alertDialog: { isDialog: false, task: null },
};

//actions
export const DialogActions = {
  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
} as const;

//action creators
export const openDialog = (task: Task) => ({
  type: DialogActions.OPEN_DIALOG as typeof DialogActions.OPEN_DIALOG,
  payload: task,
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
      return { alertDialog: { isDialog: true, task: action.payload } };
    case DialogActions.CLOSE_DIALOG:
      return { alertDialog: { isDialog: false, task: null } };
    default:
      return state;
  }
};
