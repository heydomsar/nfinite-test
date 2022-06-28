import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Input = styled('input')({
  display: 'none',
});

const PageOne = ({ saveFunction }) => {
  const [filename, setFilename] = useState();

  const getFileData = (fileList) => {
    setFilename(fileList[0]?.name);
  };

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <label htmlFor="csvfile">
          <Input
            accept=".csv"
            id="csvfile"
            name="csvfile"
            type="file"
            onChange={(e) => getFileData(e.target.files)}
          />
          <Button variant="contained" component="span">
            <AddIcon />
            &nbsp;&nbsp;Upload CSV
          </Button>
        </label>
      </Box>
      {filename && (
        <Box sx={{ margin: '20px', textAlign: 'center' }}>
          Uploaded "{filename}". Ready to Validate.
        </Box>
      )}
    </>
  );
};

export default PageOne;
