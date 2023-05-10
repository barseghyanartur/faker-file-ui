import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Link, List, ListItemButton, ListItemText, TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Item from '@mui/material/Grid';
import axios from "axios";
import axiosRetry from "axios-retry";

function App() {
  if (process.env.NODE_ENV === 'production') {
    console.log = function() {};
    console.debug = function() {};
    console.info = function() {};
    console.warn = console.error;
  }

  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [endpoints, setEndpoints] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [formOptions, setFormOptions] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [models, setModels] = useState(null);
  const [filename, setFilename] = useState(null);
  const multilines = ['content', 'options', 'mp3_generator_kwargs', 'pdf_generator_kwargs']; // Multi-line fields

  axiosRetry(axios, {
    retries: 20,
    retryDelay: (retryCount) => {
      console.log('retryCount');
      console.log(retryCount);
      return retryCount * 1000;
    }
  });

  useEffect(() => {
    const fetchEndpoints = async () => {
      const response = await axios.get(`${apiUrl}/openapi.json`, {
        retry: {
          retries: 20,
        }
      });
      const schema = response.data;
      const paths = schema.paths;
      const endpoints = Object.keys(paths).reduce((acc, path) => {
        const endpoint = path.split('/')[1];
        if (endpoint !== 'heartbeat' && endpoint !== 'providers') {
          acc[endpoint] = paths[path].post.requestBody.content['application/json'].schema;
        }
        return acc;
      }, {});
      setEndpoints(endpoints);
      console.log('ENDPOINTS');
      console.log(endpoints);

      const models = schema.components.schemas;
      setModels(models);
      setLoading(false);
      console.log('MODELS');
      console.log(models);
    };
    fetchEndpoints();
  }, []);

  useEffect(() => {
    if (endpoints && selectedEndpoint) {
      console.log(endpoints[selectedEndpoint]);
      setFormOptions(Object.fromEntries(
        Object.entries(endpoints[selectedEndpoint].properties || {})
        .map(([name, property]) => [name, property.default])
      ));
    }
  }, [endpoints, selectedEndpoint]);

  const handleEndpointClick = (endpoint) => {
    console.log(endpoint);
    setSelectedEndpoint(endpoint);
    setSelectedFileExtension(endpoint.slice(0, endpoint.indexOf('_file')));
    setSelectedModel(`${endpoint}_model`);
    console.log(`model: ${endpoint}_model`);
    console.log(models[`${endpoint}_model`]);
    setFormOptions(models[`${endpoint}_model`].properties || {});
    setDownloadUrl(null);
    setFilename(null);
  };

  const handleOptionChange = (event) => {
    const { name, value, checked } = event.target;
    console.log(models[selectedModel].properties);
    console.log(name);
    console.log(models[selectedModel].properties[name]);
    console.log("checked");
    console.log(checked);
    setFormOptions((prevOptions) => ({
      ...prevOptions,
      [name]: models[selectedModel].properties[name].type === 'boolean' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setInProgress(true);
    const body = JSON.stringify(Object.fromEntries(
      Object.entries(formOptions).map(([name, value]) => {
        if (['data_columns'].includes(name) && typeof value === 'string') {
          if (['csv_file'].includes(selectedModel)) {
            value = value.split(',').map(str => str.trim())
          } else {
            value = JSON.parse(value);
          }
        } else if (['options', 'mp3_generator_kwargs', 'pdf_generator_kwargs'].includes(name) && typeof value === 'string' && value.trim() !== "") {
          try {
            value = JSON.parse(value);
          } catch(e) {
            console.log('invalid value');
            console.log(value);
            value = null;
          }
        }
        console.log('name');
        console.log(name);
        console.log('value');
        console.log(value);
        if (value && value.constructor === String && value.trim() === '') {
          value = null;
        }
        return [name, value];
      })
    ));
    console.log('body');
    console.log(body);
    const response = await fetch(`${apiUrl}/${selectedEndpoint}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    const blob = await response.blob();
    console.log('response');
    console.log(response);
    const downloadUrl = window.URL.createObjectURL(blob);
    setDownloadUrl(downloadUrl);
    setInProgress(false);

    // Get the content-disposition header
    const contentDisposition = response.headers.get('content-disposition');
    console.log(contentDisposition);

    // Extract the 'filename' value
    const match = /filename=([^;]+)/.exec(contentDisposition);
    console.log(match);

    let filename;
    if (match && match.length > 1) {
      filename = match[1];
      setFilename(filename);
    } else {
      setFilename(`${selectedEndpoint}.${selectedFileExtension}`);
    }
    console.log('filename');
    console.log(filename);

  };

  const theme = createTheme();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={200} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} columns={12} sx={{
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }
        }}>
        <Grid item xs={2}>
          <Item sx={{py: 2,px: 2}}>
            <Typography variant="h4" component="h1" gutterBottom>File type</Typography>
            <List component="nav" aria-label="main providers folders">
              {endpoints &&
                Object.keys(endpoints).map((endpoint) => (
                  <ListItemButton key={endpoint} selected={selectedEndpoint === endpoint} onClick={() => handleEndpointClick(endpoint)}>
                    <ListItemText primary={endpoint.split("_file")[0]} />
                  </ListItemButton>
                ))}
            </List>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{py: 2, px: 2}}>
            <Typography variant="h4" component="h1" gutterBottom>Options</Typography>
            {selectedEndpoint && endpoints && (
              <div>
                <form>
                  {Object.entries(models[selectedModel].properties || {}).map(([name, property]) => {
                    const inputProps = {
                      style: {height: 'auto'}
                    };
                    const props = (multilines.includes(name)) ? {multiline: true, rows: 4, maxRows: 20, inputProps} : {};
                    const key = `${selectedModel}_${name}`;
                    if (property.type === 'boolean') {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={name}
                              label={name}
                              checked={formOptions[name] || property.default || false}
                              margin="normal"
                              variant="outlined"
                              onChange={handleOptionChange}
                              {...props}
                            />
                          }
                          label={property.title || name}
                        />
                      );
                    } else {
                      return (
                        <TextField
                            key={key}
                            name={name}
                            label={property.title || name}
                            defaultValue={property.default || null}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={handleOptionChange}
                            {...props}
                        />
                      );
                    }
                  })}
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Generate
                  </Button>
                </form>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={inProgress}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            )}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item sx={{py: 2, px: 2}}>
            <Typography variant="h4" component="h1" gutterBottom>Result</Typography>
            {downloadUrl && (
              <Link href={downloadUrl} download={`${filename}`}>
                Download
              </Link>
            )}
          </Item>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
