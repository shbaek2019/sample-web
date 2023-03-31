import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import Dropzone from 'react-dropzone';

const states = [
  {
    value: 'P1',
    label: 'P1'
  },
  {
    value: 'P2',
    label: 'P2'
  },
  {
    value: 'P4',
    label: 'P4'
  },
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    brandName: '',
    familyBrandName: '',
    description: '',
    price: '',
    ngpYn: 'P1',
    category: '',
    thickness: null,
    attr1: '',
    attr2: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Product Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="BRAND NAME"
                  name="brandName"
                  onChange={handleChange}
                  required
                  value={values.brandName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="FAMILY BRAND NAME"
                  name="familyBrandName"
                  onChange={handleChange}
                  required
                  value={values.familyBrandName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="PRICE"
                  name="price"
                  onChange={handleChange}
                  required
                  value={values.price}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="CATEGORY"
                  name="category"
                  onChange={handleChange}
                  required
                  value={values.category}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="THICKNESS"
                  name="thickness"
                  onChange={handleChange}
                  required
                  value={values.thickness}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="NGP"
                  name="ngpYn"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.ngpYn}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="ATTR 1"
                  name="attr1"
                  onChange={handleChange}
                  required
                  value={values.attr1}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="ATTR 2"
                  name="attr2"
                  onChange={handleChange}
                  required
                  value={values.attr2}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setValues({
                      ...values,
                      picture: acceptedFiles[0]
                    })
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed #cccccc`}
                      borderRadius="8px"
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <Typography>{values.picture.name}</Typography>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="PRODUCT DESCRIPTION"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
