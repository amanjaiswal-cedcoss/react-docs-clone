import { PostAdd, RemoveCircleOutlined, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper } from "@mui/material";
import FileModal from "./FileModal";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleModal, deleteDocument, editDocument, openDocument, updateDocuments } from "../redux/DocsSlice";
import { useEffect } from "react";

function Docs() {
  const dispatch: AppDispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const docsState = useAppSelector((store) => store.docsSlice);

  useEffect(()=>{
    let docs=localStorage.getItem('docs');
    console.log(docs);
    if(docs!==null){
      dispatch(updateDocuments(JSON.parse(docs)))
    } 
  },[])

  useEffect(()=>{
    localStorage.setItem('docs',JSON.stringify(docsState.docs)) 
  },[docsState.docs])

  console.log(docsState);

  return (
    <div className="docs">
      <h1 className="docs__head">Docs Manager</h1>
      <Button
        onClick={() => {
          dispatch(toggleModal(true));
        }}
        variant="contained"
        startIcon={<PostAdd />}
      >
        Add
      </Button>
      <FileModal />
      {docsState.docs.length > 0 ? (
        <div className="docs__wrapper">
          {docsState.docs.map((ele,i) => {
            return (
              <Paper key={ele.id} elevation={3} onClick={(e)=>{dispatch(openDocument(i));e.stopPropagation()}} className="doc">
                <div className="doc__head">
                  <h3 className="doc__title">{ele.title}</h3>
                  <div className="doc__actions">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      color="info"
                      onClick={(e) => {
                        dispatch(editDocument(i));
                        e.stopPropagation();
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={(e) => {
                        dispatch(deleteDocument(i));
                        e.stopPropagation();
                      }}
                    >
                      <RemoveCircleOutlined fontSize="small" />
                    </IconButton>
                  </div>
                </div>
                <div className="doc__body">
                  <p>{ele.content}</p>
                </div>
              </Paper>
            );
          })}
        </div>
      ) : (
        <h2>No documents to display :(</h2>
      )}
    </div>
  );
}

export default Docs;
