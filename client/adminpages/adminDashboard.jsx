import {
    Box,
    Grid,
    Paper,
    Typography,
    Avatar,
    IconButton,
    Badge,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  
  import PeopleIcon from "@mui/icons-material/People";
  import SchoolIcon from "@mui/icons-material/School";
  import BookIcon from "@mui/icons-material/Book";
  import BarChartIcon from "@mui/icons-material/BarChart";
  
  export default function AdminDash() {
    const stats = [
      { icon: <PeopleIcon />, label: "Total Users", value: "5,231" },
      { icon: <BookIcon />, label: "Total Courses", value: "312" },
      { icon: <SchoolIcon />, label: "Universities", value: "24" },
      { icon: <BarChartIcon />, label: "Active Students", value: "3,122" },
    ];
  
    const recentActivity = [
      "John enrolled in React Basics",
      "Sarah created 'UI Design Pro'",
      "Jane updated Python Fundamentals",
    ];
  
    return (
      <Box p={3} >
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" mb={4} >
          <Typography variant="h5" fontWeight={600}>
            Admin Dashboard
          </Typography>
         
        </Grid>
  
        {/* Stat Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid  key={i}>
              <Paper elevation={2} sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Charts and Activity */}
        <Grid container spacing={3} mt={1}>
          {/* Placeholder for Chart */}
          <Grid >
            <Paper elevation={2} sx={{ p: 3, minHeight: 280 }}>
              <Typography variant="h6" mb={2}>
                Enrollments Over Time
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="200px"
                bgcolor="#f5f5f5"
                borderRadius={1}
              >
                <BarChartIcon fontSize="large" color="disabled" />
                <Typography ml={1} color="text.secondary">
                  Chart Placeholder
                </Typography>
              </Box>
            </Paper>
          </Grid>
  
          {/* Recent Activity */}
          <Grid >
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Recent Activity
              </Typography>
              <List dense>
                {recentActivity.map((activity, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
  