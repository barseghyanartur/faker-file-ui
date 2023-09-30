import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Collapse from '@mui/material/Collapse';
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Item from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import axiosRetry from "axios-retry";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
    console.debug = function () {};
    console.info = function () {};
    console.warn = console.error;
  }

  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [endpoints, setEndpoints] = useState(null);
  const [groupedEndpoints, setGroupedEndpoints] = useState({});
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [formOptions, setFormOptions] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [models, setModels] = useState(null);
  const [filename, setFilename] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const multilines = [
    "content",
    "data_columns",
    "options",
    "mp3_generator_kwargs",
    "pdf_generator_kwargs",
    "image_generator_kwargs",
  ]; // Multi-line fields

  axiosRetry(axios, {
    retries: 20,
    retryDelay: (retryCount) => {
      console.log("retryCount");
      console.log(retryCount);
      return retryCount * 1000;
    },
  });

  useEffect(() => {
    const fetchEndpoints = async () => {
      const response = await axios.get(`${apiUrl}/openapi.json`, {
        retry: {
          retries: 20,
        },
      });
      const schema = response.data;
      const paths = schema.paths;
      let grouped = {};
      const endpoints = Object.keys(paths).reduce((acc, path) => {
        const endpoint = path.split("/")[1];
        if (endpoint !== "heartbeat" && endpoint !== "providers") {
          acc[endpoint] = paths[path].post.requestBody.content["application/json"].schema;
          const tags = paths[path].post?.tags || ["Uncategorized"];
          tags.forEach((tag) => {
            if (!grouped[tag]) {
              grouped[tag] = {};
            }
            grouped[tag][path] = endpoint;
          });
        }
        console.log("grouped");
        console.log(grouped);
        return acc;
      }, {});
      setEndpoints(endpoints);
      console.log("grouped (outside)");
      console.log(grouped);
      setGroupedEndpoints(grouped);
      console.log("ENDPOINTS");
      console.log(endpoints);

      const models = schema.components.schemas;
      setModels(models);
      setLoading(false);
      console.log("MODELS");
      console.log(models);
      // console.log("groupedEndpoints");
      // console.log(groupedEndpoints);
    };
    fetchEndpoints();
  }, []);

  useEffect(() => {
    if (endpoints && selectedEndpoint) {
      console.log(endpoints[selectedEndpoint]);
      setFormOptions(
        Object.fromEntries(
          Object.entries(endpoints[selectedEndpoint].properties || {}).map(
            ([name, property]) => [name, property.default]
          )
        )
      );
    }
  }, [endpoints, selectedEndpoint]);

  const handleEndpointClick = (endpoint) => {
    console.log(endpoint);
    setSelectedEndpoint(endpoint);
    setSelectedFileExtension(endpoint.slice(0, endpoint.indexOf("_file")));
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
    console.log("value", value);
    let valueType = models[selectedModel].properties[name]?.type;
    setFormOptions((prevOptions) => ({
      ...prevOptions,
      [name]:
        valueType === "boolean"
          ? checked
          : value,
    }));
  };

  const handleCategoryClick = (category) => {
    if (openCategory === category) {
      setOpenCategory(null);
    } else {
      setOpenCategory(category);
    }
  };

  const handleSubmit = async () => {
    try {
      setInProgress(true);
      const body = JSON.stringify(
        Object.fromEntries(
          Object.entries(formOptions).map(([name, value]) => {
            if (["data_columns"].includes(name) && typeof value === "string") {
              if (["csv_file"].includes(selectedModel)) {
                value = value.split(",").map((str) => str.trim());
              } else {
                value = JSON.parse(value);
              }
            } else if (
              [
                "options",
                "mp3_generator_kwargs",
                "pdf_generator_kwargs",
                "image_generator_kwargs",
              ].includes(name) &&
              typeof value === "string" &&
              value.trim() !== ""
            ) {
              try {
                value = JSON.parse(value);
              } catch (e) {
                console.log("invalid value");
                console.log(value);
                value = null;
              }
            } else if (["size"].includes(name) && typeof value === "string" && value.trim() !== "") {
              value = value.split(",");
            }
            console.log("name");
            console.log(name);
            console.log("value");
            console.log(value);
            if (value && value.constructor === String && value.trim() === "") {
              value = null;
            }
            return [name, value];
          })
        )
      );
      console.log("body");
      console.log(body);
      const response = await fetch(`${apiUrl}/${selectedEndpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server responded with an error:", errorResponse);
        // If errorResponse contains a message, use it. Otherwise use a default message
        const _errorMessage = errorResponse.message || "An error occurred";
        // Handle the error based on errorResponse here
        setInProgress(false);
        setErrorMessage(_errorMessage);
        setShowError(true);
        return;
      }

      const blob = await response.blob();
      console.log("response");
      console.log(response);
      const downloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);
      setInProgress(false);

      // Get the content-disposition header
      const contentDisposition = response.headers.get("content-disposition");
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
      console.log("filename");
      console.log(filename);
    } catch (err) {
      console.log("An error occurred:");
      console.log(err);
      console.error("An error occurred:", err);
      // If err object contains a message, use it. Otherwise use a default message
      const _errorMessage = err.message || "An error occurred";

      // Handle the error here
      setInProgress(false);
      setErrorMessage(_errorMessage);
      setShowError(true);
    }
  };

  const theme = createTheme();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={200} />
        </Box>
      </ThemeProvider>
    );
  }
  console.log("groupedEndpoints (just before)");
  console.log(groupedEndpoints);
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        columns={12}
        sx={{
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >

        {/*<Grid item xs={2}>*/}
        {/*  <Item sx={{ py: 2, px: 2 }}>*/}
        {/*    <Typography variant="h4" component="h1" gutterBottom>*/}
        {/*      File type*/}
        {/*    </Typography>*/}
        {/*    <List component="nav" aria-label="main providers folders">*/}
        {/*      {endpoints &&*/}
        {/*        Object.keys(endpoints).map((endpoint) => (*/}
        {/*          <ListItemButton*/}
        {/*            key={endpoint}*/}
        {/*            selected={selectedEndpoint === endpoint}*/}
        {/*            onClick={() => handleEndpointClick(endpoint)}*/}
        {/*          >*/}
        {/*            <ListItemText primary={endpoint.split("_file")[0].replace(/_/g, " ")} />*/}
        {/*          </ListItemButton>*/}
        {/*        ))}*/}
        {/*    </List>*/}
        {/*  </Item>*/}
        {/*</Grid>*/}

        <Grid item xs={2}>
          <Item sx={{ py: 0, px: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom  sx={{ pt: 2, pl: 2, pb: 0, pr: 0 }}>
              File type
            </Typography>
            <List component="nav" aria-label="main providers folders">
              {groupedEndpoints &&
                Object.keys(groupedEndpoints).map((category) => (
                  <>
                    <ListItemButton
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="category"
                    >
                      <ListItemText primary={category}/>
                    </ListItemButton>
                    <Collapse in={openCategory === category} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {Object.keys(groupedEndpoints[category]).map((endpointPath) => {
                          const endpoint = groupedEndpoints[category][endpointPath];
                          return (
                            <ListItemButton
                              key={endpoint}
                              sx={{ pl: 4, pr: 0, pb: 0, pt: 0 }}
                              selected={selectedEndpoint === endpoint}
                              onClick={() => handleEndpointClick(endpoint)}
                              className="subcategory"
                            >
                              <ListItemText primary={endpoint.split("_file")[0].replace(/_/g, " ")} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ))}
            </List>
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item sx={{ py: 2, px: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Options
            </Typography>
            {selectedEndpoint && endpoints && (
              <div>
                <form>
                  {Object.entries(models[selectedModel].properties || {}).map(
                    ([name, property]) => {
                      const inputProps = {
                        style: { height: "auto" },
                      };
                      const props = multilines.includes(name)
                        ? { multiline: true, rows: 4, maxRows: 20, inputProps }
                        : {};
                      const key = `${selectedModel}_${name}`;
                      if (property?.type === "boolean") {
                        return (
                          <FormControlLabel
                            key={key}
                            control={
                              <Checkbox
                                name={name}
                                label={property.title || name}
                                checked={
                                  formOptions[name] || property.default || false
                                }
                                margin="normal"
                                variant="outlined"
                                onChange={handleOptionChange}
                                {...props}
                              />
                            }
                            label={property.title || name}
                          />
                        );
                      } else if (property?.allOf) {
                        let defaultValue;
                        let enumModel;
                        let label;
                        for (const condition of property.allOf) {
                          if (condition.$ref) {
                            const modelName = condition.$ref.split("/").pop();
                            enumModel = models[modelName]?.enum;
                            label = models[modelName]?.title || name;
                            if (enumModel) break;
                          }
                        }
                        // console.log("enumModel", enumModel);
                        defaultValue = property?.default || enumModel?.[0] || "";
                        // Initialize the state if it's not set
                        if (formOptions[name] === undefined) {
                          setFormOptions(prevOptions => ({
                            ...prevOptions,
                            [name]: defaultValue,
                          }));
                        }
                        return (
                          <FormControl key={key} sx={{ m: 0, mt: 2, mb: 2, width: '100%' }}>
                            <InputLabel htmlFor={name}>{label}</InputLabel>
                            <Select
                              labelId={name}
                              id={name}
                              name={name}
                              value={formOptions[name] || defaultValue}
                              onChange={handleOptionChange}
                              margin="normal"
                              variant="outlined"
                            >
                              {enumModel?.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                    }
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Generate
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={showError}
                    autoHideDuration={5000}
                    onClose={() => setShowError(false)}
                  >
                    <Alert severity="error">{errorMessage}</Alert>
                  </Snackbar>
                </form>

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={inProgress}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            )}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item sx={{ py: 2, px: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Result
            </Typography>
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
