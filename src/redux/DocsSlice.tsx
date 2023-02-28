import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { 
  // below key stores the document being worked upon whether it is displayed , edited or  new document added 
  current: { id: 0, title: "", content: "" },
  // below key stores array of all the documents
  docs: [
    {
      id: 1,
      title: "Sample title",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis adipisci est incidunt quos hic fugit recusandae dicta esse, quod voluptatem illo atque natus error impedit minima quibusdam, sequi ratione perferendis.",
    },
  ],
   // below key is used to open and close modal
  isModalOpen: false,
  // below key is used for storing index of file being edited
  editIndex:-1,
  // below key is used  to reuse the modal component for adding,editing and displaying document
  modalPurpose:'add',
};

const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    // action to open or close modal
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    // action to initiate adding a document by giving new id to current key of state and setting purpose to add
    openModalToAdd: (state) => {
      state.isModalOpen = true;
      state.modalPurpose='add'
      state.current = { id: state.docs.length + 1, title: "", content: "" };
    },
    // action to update all the changes in current key 
    updateCurrentDoc: (state, action) => {
      Object.assign(state.current, action.payload);
    },
    // action to update the documents (used purticularly for accessing docs stored in local storage)
    updateDocuments:(state, action)=>{
      state.docs=action.payload
    },
    // action to place a document in current key to display in modal
    openDocument:(state,action: PayloadAction<number>)=>{
      state.modalPurpose='view'
      state.current = state.docs[action.payload];
      state.isModalOpen=true;
    },
    // action to add a new document 
    addDocument: (state) => {
      state.docs.push(state.current);
      state.current = { id: 0, title: "", content: "" };
      state.isModalOpen=false;
    },
    // action to initiate editing a document by placing it in current key and storing its index in editIndex key
    editDocument: (state, action: PayloadAction<number>) => {
      state.modalPurpose='edit'
      state.current = state.docs[action.payload];
      state.isModalOpen = true;
      state.editIndex=action.payload
    },
    // action to update the document after being edited by using editIndex  
    updateDocument: (state) => {
      state.docs[state.editIndex] = state.current;
      state.isModalOpen = false;
      state.current = { id: 0, title: "", content: "" };
      state.editIndex=-1
    },
    // action to delete a document
    deleteDocument: (state, action: PayloadAction<number>) => {
      state.docs.splice(action.payload, 1);
    },
  },
});

export const {
  toggleModal,
  openModalToAdd,
  updateCurrentDoc,
  updateDocuments,
  openDocument,
  addDocument,
  editDocument,
  updateDocument,
  deleteDocument,
} = docsSlice.actions;

export default docsSlice.reducer;
