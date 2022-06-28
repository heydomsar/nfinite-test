import { useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Toolbar,
  Typography,
} from '@mui/material';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';

const steps = ['Products', 'Results'];

const App = () => {
  const [jsonData, setJsonData] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const formEl = useRef();

  const handleNext = async () => {
    const formData = new FormData(formEl.current);
    const formProps = Object.fromEntries(formData);

    let fileData = new FormData();
    fileData.append('csvfile', formProps?.csvfile);
    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: fileData,
    })
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data?.json);
        setActiveStep(activeStep + 1);
      })
      .catch((error) => console.log(error));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <form ref={formEl}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              nfinite - Product Upload Test
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '40px auto',
          pt: 2,
          width: '60%',
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === 1} onClick={handleNext} sx={{ mr: 1 }}>
          Validate
        </Button>
      </Box>
      <Box sx={{ margin: '40px auto', width: '40%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === 0 && <PageOne saveFunction={setJsonData} />}
      {activeStep === 1 && <PageTwo data={jsonData} />}
    </form>
  );
};

export default App;
