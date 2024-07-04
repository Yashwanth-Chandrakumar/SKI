
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  ThemeProvider,
  createTheme,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
  CircularProgress,
  Collapse,
  IconButton,
  Tooltip,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import RefreshIcon from '@mui/icons-material/Refresh';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
          fontWeight: 600,
        },
        root: {
          transition: 'background-color 0.3s',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s',
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

const GlowingChip = styled(Chip)(({ theme }) => ({
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    boxShadow: '0 0 8px 2px rgba(25, 118, 210, 0.4)',
    transform: 'scale(1.05)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    transform: 'scale(1.1)',
    color: theme.palette.primary.main,
  },
}));

const FilePreviewModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

const FilePreviewContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  width: '40vw',
  height: '60vh',
  maxWidth: '95vw',
  maxHeight: '95vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

const formatDate = (dateArray) => {
  if (Array.isArray(dateArray) && dateArray.length === 3) {
    return `${dateArray[0]}-${String(dateArray[1]).padStart(2, '0')}-${String(dateArray[2]).padStart(2, '0')}`;
  }
  return 'Invalid Date';
};


const FilePreview = ({ file, formId, onClose }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file && formId) {
      setLoading(true);
      fetch(`http://localhost:5000/studentForm/${formId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setContent(url);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching file:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [file, formId]);

  if (!file) return null;

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
    const fileType = file.fileType.toLowerCase();
    if (fileType.startsWith('image/')) {
      return <img src={content} alt={file.fileName} style={{ maxWidth: '100%', maxHeight: '80vh' }} />;
    } else if (fileType === 'application/pdf') {
      return <iframe src={content} title={file.fileName} width="600vw" height="600vh" style={{ border: 'none' }} />;
    } else {
      return <Typography>Preview not available for this file type. Please download to view.</Typography>;
    }
  };

  return (
    <FilePreviewModal open={!!file} onClose={onClose}>
      <FilePreviewContent>
        <Typography variant="h6" gutterBottom>{file.fileName}</Typography>
        {renderContent()}
      </FilePreviewContent>
    </FilePreviewModal>
  );
};
const FileEntityRow = ({ file, formId, onPreview }) => {
  const canPreview = file.fileType.startsWith('image/') || file.fileType === 'application/pdf';

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5000/studentForm/${formId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <TableRow>
      <TableCell>{file.fileName}</TableCell>
      <TableCell>{file.fileType}</TableCell>
      <TableCell>{file.fileSize} bytes</TableCell>
      <TableCell>
        {canPreview && (
          <IconButton onClick={() => onPreview(file, formId)} size="small" sx={{ mr: 1 }}>
            <VisibilityIcon />
          </IconButton>
        )}
        <IconButton
          onClick={handleDownload}
          href={`http://localhost:5000/studentForm/${formId}`}
          download={file.fileName}
          size="small"
          target='_blank'
        >
          <GetAppIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};


const DetailView = ({ form }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [previewFormId, setPreviewFormId] = useState(null);

  const handlePreview = (file, formId) => {
    setPreviewFile(file);
    setPreviewFormId(formId);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div">
            Student Details
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="student details">
              <TableHead>
                <TableRow>
                  {form.studentDetails && form.studentDetails.length > 0 &&
                    Object.keys(form.studentDetails[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {form.studentDetails && form.studentDetails.map((detail, idx) => (
                  <TableRow key={idx}>
                    {Object.values(detail).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div">
            Faculty Details
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="faculty details">
              <TableHead>
                <TableRow>
                  <TableCell>Faculty Name</TableCell>
                  <TableCell>Faculty Department</TableCell>
                  <TableCell>Faculty Budget</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.facultyStudentDetails && form.facultyStudentDetails.map((detail, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{detail.facultyName}</TableCell>
                    <TableCell>{detail.facultyDepartment}</TableCell>
                    <TableCell>{detail.facultyBudget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom component="div">
          Attached Files
        </Typography>
        {form.fileEntities && form.fileEntities.length > 0 ? (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="file entities">
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Type</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.fileEntities.map((file, idx) => (
                  <FileEntityRow key={idx} file={file} formId={form.studentFormId} onPreview={handlePreview} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No files attached
          </Typography>
        )}
        </Grid>
      </Grid>
      <FilePreview file={previewFile} formId={previewFormId} onClose={() => { setPreviewFile(null); setPreviewFormId(null); }} />
    </Box>
  );
};

const Row = ({ form, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell padding="checkbox">
          <AnimatedIconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </AnimatedIconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ maxWidth: 150, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <Tooltip title="Event Name">
            <Box display="flex" alignItems="center">
              <EventIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography noWrap>{form.eventName || `Form ${index + 1}`}</Typography>
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell sx={{ maxWidth: 150, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <Tooltip title="Selected College">
            <Box display="flex" alignItems="center">
              <SchoolIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography noWrap>{form.selectedCollege}</Typography>
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell>{formatDate(form.dateFrom)}</TableCell>
        <TableCell>{formatDate(form.dateTo)}</TableCell>
        <TableCell sx={{ maxWidth: 150, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <Typography noWrap>{form.instituteName}</Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: 150, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <Tooltip title="Location">
            <Box display="flex" alignItems="center">
              <LocationOnIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography noWrap>{form.location}</Typography>
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Budget Requested">
            <Box display="flex" alignItems="center">
              <AttachMoneyIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              {form.budgetRequested}
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell sx={{ maxWidth: 150, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <Tooltip title="Activity Type">
            <Box display="flex" alignItems="center">
              <CategoryIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography noWrap>{form.activityType}</Typography>
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell>
          <GlowingChip
            label={form.status}
            color={form.status === 'Approved' ? 'success' : form.status === 'Pending' ? 'warning' : 'error'}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Tooltip title={`${form.fileEntities ? form.fileEntities.length : 0} files attached`}>
            <Box display="flex" alignItems="center">
              <AttachFileIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
              {form.fileEntities ? form.fileEntities.length : 0}
            </Box>
          </Tooltip>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DetailView form={form} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};


const StudentFormTable = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(60000); // 60 seconds by default
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFormDetails = useCallback(() => {
    setIsRefreshing(true);
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZ210QHNraS5hYy5pbiIsImlhdCI6MTcxOTY1ODQxMywiZXhwIjoxNzE5NzQ0ODEzfQ.VjEtJphkrLHW3G07voYxLMqrG6U1BX0zDik-x6lKw8I";
    axios.get(`http://localhost:5000/getAllStudentFormDetails`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setFormDetails(response.data);
        response.data.forEach((form, index) => {
          console.log(`Form ${index} ID:`, form.studentFormId);
        });
        setIsRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching form details:', error);
        setIsRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchFormDetails(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchFormDetails();
    }, refreshInterval);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [fetchFormDetails, refreshInterval]);

  const handleStatusFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
    }
  };

  const handleRefreshIntervalChange = (event) => {
    setRefreshInterval(event.target.value);
  };

  const filteredForms = formDetails.filter(form => 
    statusFilter === 'all' || form.status.toLowerCase() === statusFilter
  );

  return (
    <ThemeProvider theme={theme}>
      <Fade in={true} timeout={1000}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, px: 2 }}>
          <Paper elevation={3} sx={{ maxWidth: '100%', margin: '0 auto', padding: '24px', borderRadius: '12px' }}>
            <Typography variant="h5" gutterBottom color="primary" align="center" mb={4}>
              Student Form Details
            </Typography>
            
            <Box mb={4} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="subtitle1" gutterBottom>Filter by Status:</Typography>
              <ToggleButtonGroup
                value={statusFilter}
                exclusive
                onChange={handleStatusFilterChange}
                aria-label="status filter"
                size="small"
                sx={{
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  '& .MuiToggleButton-root': {
                    borderRadius: '20px',
                    m: 0.5,
                    px: 2,
                    py: 0.5,
                    border: '1px solid rgba(25, 118, 210, 0.5)',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    },
                  },
                }}
              >
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                  <ToggleButton key={status} value={status} aria-label={`${status} status`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
              <FormControl variant="outlined" size="small">
                <InputLabel id="refresh-interval-label">Refresh Interval</InputLabel>
                <Select
                  labelId="refresh-interval-label"
                  value={refreshInterval}
                  onChange={handleRefreshIntervalChange}
                  label="Refresh Interval"
                >
                  <MenuItem value={30000}>30 seconds</MenuItem>
                  <MenuItem value={60000}>1 minute</MenuItem>
                  <MenuItem value={300000}>5 minutes</MenuItem>
                  <MenuItem value={600000}>10 minutes</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Data is refreshing">
                <IconButton 
                  color="primary" 
                  sx={{ 
                    ml: 1, 
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': {
                        transform: 'rotate(0deg)',
                      },
                      '100%': {
                        transform: 'rotate(360deg)',
                      },
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            {filteredForms.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table aria-label="collapsible table" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox" />
                      <TableCell>Event Name</TableCell>
                      <TableCell>College</TableCell>
                      <TableCell>Date From</TableCell>
                      <TableCell>Date To</TableCell>
                      <TableCell>Institute</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Budget</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Files</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredForms.map((form, index) => (
                      <Row key={index} form={form} index={index} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

export default StudentFormTable;