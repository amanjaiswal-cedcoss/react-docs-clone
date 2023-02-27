import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  addDocument,
  toggleModal,
  updateCurrentDoc,
  updateDocument,
} from "../redux/DocsSlice";
import { AppDispatch, RootState } from "../redux/store";
function FileModal() {
  const dispatch: AppDispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const docsState = useAppSelector((store) => store.docsSlice);

  return (
    <Dialog
      open={docsState.isModalOpen}
      aria-describedby="alert-dialog-slide-description"
    >
      {docsState.modalPurpose === "view" ? (
        <>
          <DialogContent>
            <div>
              <h3>{docsState.current.title}</h3>
              <p>{docsState.current.content}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(toggleModal(false));
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>{"Fill in the details of file"}</DialogTitle>
          <DialogContent>
            <form className="addfile__form">
              <FormControl variant="standard">
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  value={docsState.current.title}
                  onChange={(e) => {
                    dispatch(updateCurrentDoc({ title: e.target.value }));
                  }}
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="details">Details</InputLabel>
                <OutlinedInput
                  label="Details"
                  value={docsState.current.content}
                  onChange={(e) => {
                    dispatch(updateCurrentDoc({ content: e.target.value }));
                  }}
                  multiline
                  rows={4}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            {docsState.modalPurpose === "add" ? (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(addDocument());
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(updateDocument());
                }}
              >
                Update
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default FileModal;
