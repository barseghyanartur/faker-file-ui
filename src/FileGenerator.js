import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Link, List, ListItemButton, ListItemText, TextField, Typography, Button } from '@mui/material';
import Item from '@mui/material/Grid';
import axios from "axios";

function App() {
  if (process.env.NODE_ENV === 'production') {
    console.log = function() {};
    console.debug = function() {};
    console.info = function() {};
    console.warn = console.error;
  }

  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [endpoints, setEndpoints] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [formOptions, setFormOptions] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [models, setModels] = useState(null);
  const multilines = ['content', 'options']; // Multi-line fields

  useEffect(() => {
    const fetchEndpoints = async () => {
      // const response = await fetch(`${apiUrl}/openapi.json`);
      const response = await axios.get(`${apiUrl}/openapi.json`, {
        retry: {
          retries: 10,
          retryDelay: (retryCount) => {
            return retryCount * 1000;
          }
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
      console.log("ENDPOINTS");
      {endpoints &&
              Object.keys(endpoints).map((endpoint) => {
                  console.log(endpoint);
                  console.log(endpoints[endpoint]);
              })}

      const models = schema.components.schemas;
      setModels(models);
      setLoading(false);
      console.log("MODELS");
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
  };

  const handleOptionChange = (event) => {
    setFormOptions((prevOptions) => ({
      ...prevOptions,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch(`${apiUrl}/${selectedEndpoint}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(
        Object.entries(formOptions)
          .filter(([name, value]) => value !== undefined)
      )),
    });
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    setDownloadUrl(downloadUrl);
  };

  const theme = createTheme();

  if (loading) {
    return <div>Loading...</div>;
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
              <form>
                {Object.entries(models[selectedModel].properties || {}).map(([name, property]) => {
                  const inputProps = {
                    style: {height: 'auto'}
                  };
                  const props = (multilines.includes(name)) ? {multiline: true, rows: 4, maxRows: 20, inputProps} : {};
                  const key = `${selectedModel}_${name}`;

                  return (
                    <TextField
                      key={key}
                      name={name}
                      label={name}
                      defaultValue={property.default || null}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={handleOptionChange}
                      {...props}
                    />
                  );
                })}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Generate
                </Button>
              </form>
            )}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item sx={{py: 2, px: 2}}>
            <Typography variant="h4" component="h1" gutterBottom>Result</Typography>
            {downloadUrl && (
              <Link href={downloadUrl} download={`${selectedEndpoint}.${selectedFileExtension}`}>
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
