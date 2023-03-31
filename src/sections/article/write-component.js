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

const types = [
    {
        value: 'Y',
        label: 'PUBLIC'
    },
    {
        value: 'N',
        label: 'PRIVATE'
    },
];

const category = [
    {
        value: 'book',
        label: 'BOOK'
    },
    {
        value: 'movie',
        label: 'MOVIE'
    },
    {
        value: 'it',
        label: 'IT'
    },
    {
        value: 'art',
        label: 'ART'
    },
    {
        value: 'music',
        label: 'MUSIC'
    },
]

export const WriteComponent = () => {
  const [values, setValues] = useState({
    title: '',
    contents: '',
    category: 'music',
    publicYn: 'Y'
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
          subheader="Title? Contents? You can write anything you want!"
          title="Tell me Your Story"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify your subject"
                  label="TITLE"
                  name="title"
                  onChange={handleChange}
                  required
                  value={values.title}
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
                  select
                  SelectProps={{ native: true }}
                  value={values.category}
                >
                  {category.map((option) => (
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
                  label="PUBLIC YN"
                  name="publicYn"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.publicYn}
                >
                  {types.map((option) => (
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
                md={12}
              >
                <TextField
                  fullWidth
                  label="STORY"
                  name="contents"
                  multiline
                  rows={8}
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
            Save Article
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
