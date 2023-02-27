import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  current: { id: 0, title: "", content: "" },
  docs: [
    {
      id: 1,
      title: "Sample title",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis adipisci est incidunt quos hic fugit recusandae dicta esse, quod voluptatem illo atque natus error impedit minima quibusdam, sequi ratione perferendis.",
    },
  ],
  isModalOpen: false,
  editIndex:-1,
  modalPurpose:'add',
};

const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
      state.modalPurpose='add'
    },
    updateCurrentDoc: (state, action) => {
      Object.assign(state.current, action.payload);
    },
    openDocument:(state,action: PayloadAction<number>)=>{
      state.modalPurpose='view'
      state.current = state.docs[action.payload];
      state.isModalOpen=true;
    },
    addDocument: (state) => {
      state.docs.push(state.current);
      state.current = { id: state.docs.length + 1, title: "", content: "" };
      state.isModalOpen=false
    },
    editDocument: (state, action: PayloadAction<number>) => {
      state.modalPurpose='edit'
      state.current = state.docs[action.payload];
      state.isModalOpen = true;
      state.editIndex=action.payload
    },
    updateDocument: (state) => {
      state.docs[state.editIndex] = state.current;
      state.isModalOpen = false;
      state.current = { id: state.docs.length + 1, title: "", content: "" };
      state.editIndex=-1
    },
    deleteDocument: (state, action: PayloadAction<number>) => {
      state.docs.splice(action.payload, 1);
    },
  },
});

export const {
  toggleModal,
  updateCurrentDoc,
  openDocument,
  addDocument,
  editDocument,
  updateDocument,
  deleteDocument,
} = docsSlice.actions;
export default docsSlice.reducer;
