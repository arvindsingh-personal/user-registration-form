import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Address from './Address';
import PersonalInfo from './PersonalInfo';
import { useFormik } from 'formik';
import { userDetailsSchemaForStep1 } from '../../Schemas/userDetailsSchema';

const steps = ['Personal details', 'Address details'];
const initialValues = {
  name: "",
  mobile: "",
  age: "",
  gender: "",
  idType:"",
  idNumber:"",
  address:"",
  city:"",
  state:"",
  zip:"",
  country:""
};


export default function UserDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, } =
  useFormik({
    initialValues,
    validationSchema: userDetailsSchemaForStep1,
    onSubmit: (values, action) => {
      alert("dsfd")
      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
        values
      );
      action.resetForm();
    },
  });
  // console.log("valu ",errors)
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <PersonalInfo touched={touched} values={values}errors={errors} handleChange={handleChange} handleBlur={handleBlur}/>;
      case 1:
        return <Address values={values} handleChange={handleChange} handleBlur={handleBlur} handleSubmit={handleSubmit}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            User Details
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your submitting details.
              </Typography>
              <Button color="primary" onClick={()=>setActiveStep(0)}>Add another details</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit}>{getStepContent(activeStep)}</form>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit Details' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
