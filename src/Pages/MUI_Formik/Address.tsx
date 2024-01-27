import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
interface Props{
  values:any;
  handleChange:(e:any)=>void;
  handleBlur:(e:any)=>void;
  handleSubmit:(e:any)=>void;
}
export default function Address(props:Props) {
  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Address Info
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id="address"
          name="address"
          label="Address"
          fullWidth
          variant="standard"
          value={props.values.address}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          variant="standard"
          value={props.values.city}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          value={props.values.state}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          variant="standard"
          value={props.values.zip}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          variant="standard"
          value={props.values.country}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
      </Grid>
    </Grid>
  </React.Fragment>
  );
}
