import { PostAdd, RemoveCircleOutlined, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper } from "@mui/material";
import FileModal from "./FileModal";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {deleteDocument, editDocument, openDocument, updateDocuments, openModalToAdd } from "../redux/DocsSlice";
import { useEffect } from "react";

function Docs() {
  const dispatch: AppDispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const docsState = useAppSelector((store) => store.docsSlice);

  console.log(docsState.current)

  // useEffect for getting values of any saved documents in local storage and updating the redux store
  useEffect(()=>{
    let docs=localStorage.getItem('docs');
    if(docs!==null){
      dispatch(updateDocuments(JSON.parse(docs)))
    } 
  },[])

  // useEffect for updating any change in documents array to local Storage
  useEffect(()=>{
    localStorage.setItem('docs',JSON.stringify(docsState.docs)) 
  },[docsState.docs])

  return (
    <div className="docs">
      <h1 className="docs__head">Docs Manager</h1>
      <Button
        onClick={() => {
          dispatch(openModalToAdd());
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
                <div className="doc__head">
                  <h3 className="doc__title">{ele.title}</h3>
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
