import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

function App() {
  const [open, setOpen] = useState(false);
  const [data, setDataList] = useState({} as any);
  const [InputValue, setInputValue] = useState("");
  const [Error, setError] = useState("");
  const [TextValue, setTextValue] = useState("");
  const [Apicall, setApicall] = useState(0);

  useEffect(() => {
    ApiLoad();
  }, [Apicall]);

  const handleClickOpen = () => {
    if (TextValue === "") {
      setError("Please Enter the Answer");
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ApiLoad = async () => {
    await axios.get("https://jservice.io/api/random").then((response) => {
      setDataList(response.data);
    });
  };
  const TextData = (dataText: any) => {
    setInputValue(dataText.target.value);
    setTextValue(dataText.target.value);
    if (InputValue !== "") {
      setError("");
    }
  };
  const LoadQuestion = () => {
    setTextValue("");
    setOpen(false);
    var rand = 1 + Math.random() * (1 - 10);
    setApicall(rand);
  };
  return (
    <div className="App">
      <div className="card">
        <h2>Small Trivia game </h2>
        {data[0] && (
          <>
            <h3>Q. {data[0].question}</h3>
            <input
              type="text"
              value={TextValue}
              placeholder="Enter your Answer"
              onChange={(dataText) => TextData(dataText)}
            />
            <br />
            <h6>{Error}</h6>
            <button onClick={handleClickOpen}>Submit</button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                Result
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <div>
                  {InputValue === data[0].answer ? (
                    <>
                      <h1 className="Correct">Your Answer is Correct</h1>
                    </>
                  ) : (
                    <>
                      <h1 className="Incorect">Your Answer is Incorrect</h1>
                    </>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <button
                  className="loadquestion"
                  autoFocus
                  onClick={LoadQuestion}
                >
                  Load Another Question
                </button>
              </DialogActions>
            </BootstrapDialog>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
