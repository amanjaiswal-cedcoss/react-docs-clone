import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
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
    <Modal
      open={docsState.isModalOpen}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* if the user clicked on any doc  that is (modalPurpose === 'view') ,then only content is displayed without any functionality to edit */}
      {docsState.modalPurpose === "view" ? (
        <div className="modal">
          <h3>{docsState.current.title}</h3>
          <p>{docsState.current.content}</p>
          <div className="modal__actions"><Button
            variant="contained"
            onClick={() => {
              dispatch(toggleModal(false));
            }}
          >
            Close
          </Button>
          </div>
        </div>
      ) : (
        /* if the user clicked on any add or edit button (modalPurpose !== 'add') ,then only content is displayed with the functionality to edit */
        <div className="modal">
          <h2>Fill in the details of file</h2>
          <form className="modal__form">
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                value={docsState.current.title}
                onChange={(e) => {
                  dispatch(updateCurrentDoc({ title: e.target.value }));
                }}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="details">Details</InputLabel>
              <OutlinedInput
                size="small"
                label="Details"
                value={docsState.current.content}
                onChange={(e) => {
                  dispatch(updateCurrentDoc({ content: e.target.value }));
                }}
                multiline
                rows={5}
              />
            </FormControl>
            <div className="modal__actions">
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(toggleModal(false));
                }}
              >
                Close
              </Button>
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
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}

export default FileModal;
