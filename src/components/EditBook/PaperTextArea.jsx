import React from "react";
import { TextField, Paper } from "@mui/material";
import { getStyleValue, styled } from "@mui/system";

const WritingPaper = styled(TextField)({
    "& .MuiInputBase-root": {
        padding: "16px",
        // backgroundColor: "#fafafa",
        // color: '#000'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        borderColor: "#e0e0e0",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e0e0e0",
    },
});

export default function PaperTextArea({ value, handleEditorChange }) {
    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
            <WritingPaper
                value={value}
                onChange={handleEditorChange}
                multiline
                rows={24}
                variant="outlined"
                fullWidth
                placeholder="Write something..."
            />
        </Paper>
    );
}
