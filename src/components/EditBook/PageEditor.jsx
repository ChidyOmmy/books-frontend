import { Stack, Button, CircularProgress } from '@mui/material';
import Editor from './Editor';

const PageEditor = ({ value, updateMode, loading, handleEditorChange, updatePage, addPage }) => {
    return (
        <Stack spacing={2}>
            <Editor value={value} handleEditorChange={handleEditorChange} />
            {updateMode ? (
                <Button onClick={updatePage} variant='contained' color='greenishColor'>
                    Edit Page {loading && <CircularProgress size={16} />}
                </Button>
            ) : (
                <Button variant='contained' color='secondary' disabled={loading} onClick={addPage}>
                    Add New Page {loading && <CircularProgress size={16} />}
                </Button>
            )}
        </Stack>
    );
};

export default PageEditor;
