import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
interface Props{
  values:any;
  handleChange:(e:any)=>void;
  handleBlur:(e:any)=>void;
  errors:any;
  touched:any
}
export default function PersonalInfo(props:Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
            required
            sx={{color:"red"}}
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={props.values.name}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.name && props.touched.name}
          />
          {props.errors.name && props.touched.name && <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.name}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={props.values.mobile}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.mobile && props.touched.mobile}
          />
          {props.errors.mobile && props.touched.mobile ? <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.mobile}</Typography>:null}
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ minWidth: 240 }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
        sx={{
          textAlign:'left'
          }}
          id=""
          value={props.values.gender}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          label="Gender"
          error={props.errors.gender && props.touched.gender}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select></FormControl>
        {props.errors.gender && props.touched.gender && <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.gender}
      </Typography>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            variant="standard"
            type='number'
            value={props.values.age}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.age && props.touched.age}
          />
          {props.errors.age && props.touched.age && <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.age}</Typography>}
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ minWidth: 240 }}>
        <InputLabel id="demo-simple-select-standard-label">Govt Issued ID Type </InputLabel>
        <Select
        sx={{
          textAlign:'left'
          }}
          id="idType"
          value={props.values.idType}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          label="idType"
          error={props.errors.idType && props.touched.idType}
        >
          <MenuItem value={'aadhar'}>Aadhar</MenuItem>
          <MenuItem value={'pan'}>Pan</MenuItem>
        </Select></FormControl>
        {props.errors.idType && props.touched.idType && <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.idType}</Typography>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          value={props.values.idNumber}
            id="idNumber"
            name="idNumber"
            label="Enter your PAN number"
            fullWidth
            variant="standard"
            disabled
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.idNumber && props.touched.idNumber}
          />
          {props.errors.idNumber && props.touched.idNumber && <Typography variant="caption" display="block"  gutterBottom sx={{color:'#d32f2f',textAlign:'left'}}>
        {props.errors.idNumber}</Typography>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
