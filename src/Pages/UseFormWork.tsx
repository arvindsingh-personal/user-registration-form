import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import Datatable from "./Datatable";
import {
  userDetailsSchemaForStep1,
  userDetailsSchemaForStep2,
} from "../Schemas/userDetailsSchema";
import { useDispatch } from "react-redux";

const initialValues = {
  name: "",
  mobile: "",
  age: "",
  gender: "",
  idType: "",
  idNumber: "",
  adhaarNumber: "",
  panNumber: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const FormComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(initialValues);
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("all");
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });
  const IdName =
    control?._formValues?.idType === "Aadhar Card"
      ? "adhaarNumber"
      : control?._formValues?.idType === "PAN Card"
      ? "panNumber"
      : "adhaarNumber";

  const onSubmit = async (data: any) => {
    try {
      if (currentStep == 0) {
        await userDetailsSchemaForStep1.validate(data, { abortEarly: false });
        setCurrentStep(currentStep + 1);
      } else {
        await userDetailsSchemaForStep2.validate(data, { abortEarly: false });
        dispatch({ type: "add_user", payload: data });
        reset();
        setCurrentStep(0);
      }
      setError(initialValues);
    } catch (validationErrors: any) {
      let flag = false;
      const formattedErrors = validationErrors.inner.reduce(
        (acc: any, err: any) => {
          if (IdName === "adhaarNumber" && err.path === "panNumber") {
            acc[err.path] = "";
          } else if (IdName === "panNumber" && err.path === "adhaarNumber") {
            acc[err.path] = "";
          } else {
            flag = true;
            acc[err.path] = err.message;
          }
          return acc;
        },
        {}
      );
      setError({ ...initialValues, ...formattedErrors });
      if (!flag) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const steps = ["Personal Details", "Address Details"];
  const genderOptions = ["Male", "Female", "Other"];
  const idTypeOptions = ["Aadhar Card", "PAN Card"];

  const getCountries = async () => {
    let countriesData = await fetch(
      `https://restcountries.com/v3.1/${searchText}`
    );
    let countriesJSON = await countriesData.json();
    let filteredCountries = countriesJSON.map(
      (countries: any) => countries?.name?.common
    );

    setCountries(filteredCountries);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText("name/" + event?.target?.value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Stepper activeStep={currentStep} style={{ marginTop: "20px" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ padding: 4 }}
        >
          {steps[currentStep]}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Page 1 fields */}
            {currentStep === 0 && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={error.name != ""}
                        helperText={error.name}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        error={error.mobile != ""}
                        helperText={error.mobile}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ textAlign: "left" }}
                        {...field}
                        label="Gender"
                        select
                        variant="outlined"
                        fullWidth
                        error={error.gender != ""}
                        helperText={error.gender}
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Age"
                        variant="outlined"
                        fullWidth
                        error={error.age != ""}
                        helperText={error.age}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="idType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ textAlign: "left" }}
                        {...field}
                        label="Govt Issued Id Name"
                        select
                        variant="outlined"
                        fullWidth
                        error={error.idType != ""}
                        helperText={error.idType}
                      >
                        {idTypeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={IdName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={"Id Number"}
                        variant="outlined"
                        fullWidth
                        error={error?.[IdName] != ""}
                        helperText={error?.[IdName]}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Page 2 fields */}
            {currentStep === 1 && (
              <>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pin Code"
                        variant="outlined"
                        fullWidth
                        error={error.zip.length > 6}
                        helperText={error.zip}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...field}
                            label="Select Country"
                            variant="outlined"
                            onChange={handleSearchChange}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Navigation buttons */}
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: "20px" }}
          >
            {currentStep > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button variant="contained" type="submit" color="primary">
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            )}
          </Grid>
        </form>
      </Paper>
      <Datatable />
    </Container>
  );
};

export default FormComponent;
