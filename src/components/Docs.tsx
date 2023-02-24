import { PostAdd } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { docsStateType } from "../types";
import AddFile from "./AddFile";

function Docs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<docsStateType>({
    current: { id: 0, title: "", content: "" },
    docs: [
      { id: 1, title: "tghjtj", content: "okihn njfnjih jnjn" },
      { id: 2, title: "tghjtj", content: "okihn njfnjih jnjn" },
      { id: 3, title: "tghjtj", content: "okihn njfnjih jnjn" },
      { id: 4, title: "tghjtj", content: "okihn njfnjih jnjn" },
      { id: 5, title: "tghjtj", content: "okihn njfnjih jnjn" },
    ],
  });

  console.log(isModalOpen);
  return (
    <div className="docs">
      <h1 className="docs__head">Docs Manager</h1>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        variant="contained"
        startIcon={<PostAdd />}
      >
        Add
      </Button>
      <AddFile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="docs__wrapper">
        {state.docs.map((ele) => {
          return (
            <Paper elevation={3} className="doc">
              <h3>{ele.title}</h3>
              <p>{ele.content}</p>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}

export default Docs;
