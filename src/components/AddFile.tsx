import { Button, Dialog, DialogActions, DialogContent,DialogTitle,TextField } from "@mui/material"

type PropTypes={
    isModalOpen:boolean,
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}

function AddFile(props:PropTypes) {
    const {isModalOpen,setIsModalOpen}={...props}

  return (
    <Dialog
        open={isModalOpen}
        onClose={()=>{setIsModalOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Fill in the details of file"}</DialogTitle>
        <DialogContent>
          <form className="addfile__form">
          <TextField label="Title" variant="standard" />
          <TextField label="Details" multiline rows={4}/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={()=>{setIsModalOpen(false)}}>Submit</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddFile