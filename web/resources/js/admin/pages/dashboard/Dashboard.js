import React, { useCallback, useState } from 'react';
import AppComponentHeader from '../../@crema/core/AppComponentHeader';
import AppGridContainer from '../../@crema/core/AppGridContainer';
import AppAnimate from "../../@crema/core/AppAnimate";
import { Card, CardContent, CardHeader, Grid, Typography, TableContainer, Table, TableHead, Box, TableBody, TableRow, TableCell } from "@mui/material";
import { useSelector } from "react-redux";
import IntlMessages from "../../@crema/utility/IntlMessages";
import DashboardService from "../../services/DashboardService";
import { Chart } from "react-google-charts";
import { useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { convertLength } from '@mui/material/styles/cssUtils';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import AppDateFiled from '../../components/AppDateFiled';
import CloseIcon from '@mui/icons-material/Close';


const Dashboard = () => {

  const [apiData, setApiData] = useState({})
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const open = Boolean(menuAnchorEl);

  var userInfo = localStorage.getItem('user');
  var myUserInfo = JSON.parse(userInfo)
  const handleActionMenuClick = (event, item) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedItemData(item);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const redirectToStage = (caseTypeId, uuid) => {
    if (caseTypeId === 2) {
      navigate(`/case-stages-motor/${uuid}`, { state: { message: "Failed to submit form" } });
    } else {
      navigate(`/case-stages/${uuid}`, { state: { message: "Failed to submit form" } });
    }
  };

  const [registeredTableData, setRegisteredTableData] = useState([]);
  const [dueTableData, setDueTableData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartsData, setPieChartsData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [years, setyears] = useState([]);
  const localizer = momentLocalizer(moment);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const divStyles = {
    padding: '7px',
    fontSize: '16px',
    borderRadius: '8px',
    width: '100px',
    marginBottom: '10px',
    border: '1px solid #333',
    background: '#FFFFFF',
    // float: 'right',
  };
  const eventPopupStyles = {
    maxWidth: '700px',
    maxHeight: '500px',
    margin: '2.5rem auto',
    position: 'fixed',
    top: '70%',
    left: '57%',
    zIndex: '1055',
    transform: 'translate(-50%, -90%)',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    outline: '0',
    padding: '1.875rem',
    borderRadius: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 10px',
  };

  const styledBoxStyles = {
    display: 'block',
    background: 'none',
    border: 'none',
    float: 'right',
    marginTop: '-10px',
  };

  const styles = {
    container: {
      textAlign: 'left',
      display: 'grid',
      lineHeight: '10px',
      fontSize: '18px',
      padding: '20px',
      borderBottom: '1px solid#333',
    }
  };
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    zIndex: 999, // Place it below the popup
  };
  
  const popupContentStyles = {
    textAlign: 'center',
  };

  const handleEventSelect = (event) => {
    console.log('000', event);
    setSelectedEvent(event.caseDetails);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClosePopup();
    }
  };

  const pieChartOptions = {
    title: "Case Activity Eminent",
    titleTextStyle: {
      fontSize: 20,
      bold: true,
      textAlign: "center",
      margin: "auto"
    },
    pieHole: 0.4,
    is3D: false,
  };

  const pieChartsOptions = {
    title: "Case Activity MACT",
    titleTextStyle: {
      fontSize: 20,
      bold: true,
      textAlign: "center",
      margin: "auto"
    },
    pieHole: 0.4,
    is3D: false,
  };

  const barChartOptions = {
    chart: {
      title: "Number Of Case",
      colors: ['#00aaff', '#ffff00'],
      is3D: true,
    },
    colors: ['blue', 'yellow']
  };

  const events = [
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Event 2',
      start: moment().add(1, 'days').toDate(),
      end: moment().add(1, 'days').toDate(),
    },

  ];


  const user = useSelector(state => {
    return user;
  });
  function callAPI(data = {}) {
    console.log(data, 'data')
    DashboardService.fetchDashboardReport(data).then(response => {
      console.log(response, 'rs')

      setRegisteredTableData([response.data.recent_user_details])
      setDueTableData([myUserInfo.role == 'user' ? response.data.due_date_court_case_details_user
        : response.data.due_date_court_case_details])
      console.log("master data: ", response)
      setStatistics([
        { title: 'Total Users', value: myUserInfo.role === 'user' ? 'roleUser' : response.data.total_users },
        { title: 'Total Registered Cases', value: myUserInfo.role === 'user' ? response.data.total_registered_cases_user : response.data.total_registered_cases },
        { title: 'Total Registered Closed Cases', value: myUserInfo.role === 'user' ? response.data.total_registered_closed_cases_user : response.data.total_registered_closed_cases },
      ]);

      setCalendarData([myUserInfo.role == 'user' ? response.data.calender_view_court_case_details_user :
        response.data.calender_view_court_case_details])

      setPieChartData([
        ["Task", "Hours per Day"],
        ["Total Registered Cases", myUserInfo.role == 'user' ? response.data.total_registered_bank_cases_user :
          response.data.total_registered_bank_cases],
        ["Total Registered Closed Cases", myUserInfo.role == 'user' ? response.data.total_registered_closed_cases_bank_recovery_user
          : response.data.total_registered_closed_cases_bank_recovery],
      ])
      setPieChartsData([
        ["Task", "Hours per Day"],
        ["Total Registered Cases", myUserInfo.role == 'user' ? response.data.total_registered_mact_cases_user : response.data.total_registered_mact_cases],
        ["Total Registered Closed Cases", myUserInfo.role == 'user' ? response.data.total_registered_closed_cases_mact_user : response.data.total_registered_closed_cases_mact],
      ])

      setyears(myUserInfo.role == 'user' ? response.data.year_list :
        response.data.year_list)

      var transformedData;
      if (myUserInfo.role == 'user') {
        console.log("userInfo", myUserInfo.role);
        console.log("esponse.data.monthly_court_case_counts_user", ...response.data.monthly_court_case_counts_user);
        transformedData = [
          ['Month', 'Active', 'Closed'],
          ...response.data.monthly_court_case_counts_user?.map(item => [
            `${item.month}`,
            parseInt(item.count_status_1),
            parseInt(item.count_status_5)
          ])
        ];
      }
      else {

        transformedData = [
          ['Month', 'Active', 'Closed'],
          ...response.data.monthly_court_case_counts?.map(item => [
            `${item.month}`,
            parseInt(item.count_status_1),
            parseInt(item.count_status_5)
          ])
        ];
      }
      setBarChartData(transformedData)

    }).catch((error) => {
      console.log('re', error);
    });
  }
  useEffect(() => {
    callAPI();
  }, [])



  const MyCalendar = () => {
    console.log("123567", calendarData);

    const localizerss = momentLocalizer(moment);
    const eventssss = calendarData[0]?.map(item => {
      const eventDate = moment(myUserInfo.role == 'user' ? item.formatted_created_at_user : item.formatted_created_at).toDate();
      const countTooltip = `Count: ${myUserInfo.role == 'user' ? item.count_same_date_user : item.count_same_date}`;
      const caseDetail = myUserInfo.role == 'user' ? item.calender_view_court_case_details_info_user : item.calender_view_court_case_details_info;

      return {
        start: eventDate,
        end: eventDate,
        title: myUserInfo.role == 'user' ? 'Number Of Cases' +' : ' +item.count_same_date_user : 'Number Of Cases' +' : ' +item.count_same_date.toString(), // Display count on the event
        tooltip: countTooltip, // Display count as a tooltip
        caseDetails: caseDetail,
      };
    });
    return (
      <div style={{ height: 500 }}>
        {/* <Calendar
          localizer={localizerss}
          events={eventssss}
          data={calendarData}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']} 
          defaultView="month" 
          style={{ marginBottom: '20px' }}
        /> */}
        <Calendar
          localizer={localizerss}
          events={eventssss}
          views={['month', 'week', 'day']}
          defaultView="month"
          style={{ marginBottom: '20px' }}
          onSelectEvent={handleEventSelect}
        />
        {selectedEvent && (
           <div style={overlayStyles} onClick={handleOverlayClick}>
          <div style={eventPopupStyles}>
            <div style={popupContentStyles}>
              <button onClick={handleClosePopup} style={styledBoxStyles}
              ><CloseIcon /></button>
              {/* <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.start.toString()}</p> */}
              {/* Display case details */}
              {selectedEvent.map((caseDetails, event, index) => (
                <div key={event} style={styles.container}>
                  {/* <p><strong>Case Id:</strong> {caseDetails.case_type_id}</p> */}
                  <p><strong>Case Number:</strong> {caseDetails.formatted_case_number}</p>
                  <p><strong>Case Type:</strong> {caseDetails.case_type_name}</p>
                  <p><strong>Assignee Name:</strong> {caseDetails.full_name}</p>
                  <p><strong>Status Name:</strong> {caseDetails.status_name}</p>
                  <p><strong>Assigned Date:</strong> {caseDetails.formatted_created_at}</p>
                  <p><strong>Month:</strong> {caseDetails.month}</p>
                  <p><strong>Year:</strong> {caseDetails.year}</p>
                </div>
              ))}

            </div>
           </div>
          </div>
        )}

      </div>
    );
  };

  const adminRoles = ['super-admin', 'site-admin'];

  function newfunction(data) {
    setSelectedOption(data);
    const sendData = {
      year: data
    }
    callAPI(sendData);
  }

  function StatisticsCard({ title, value }) {
    return (
      <Card style={{ marginLeft: '30px' }}>
        <CardContent>
          <Typography variant="h2" component="div" style={{ textAlign: 'center', marginTop: '20px' }}>
            {title}
            <p>{value}</p>
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <AppComponentHeader
      // title={<IntlMessages id="page.dashboard.title" />}
      // description={<IntlMessages id="page.dashboard.info" />}
      />
      <AppGridContainer>
        <Grid container spacing={3}>
          {statistics.map((statistic, index) => {
            return (
              <>
                {statistic.value == 'roleUser' ? null :
                  <Grid key={index} item xs={12} md={4}>
                    <StatisticsCard title={statistic.title} value={statistic.value} />
                  </Grid>

                }
              </>
            )
          })}
        </Grid>
      </AppGridContainer>

      <Card
        style={{
          width: '100%',
          marginTop: 50,
          backgroundColor: 'white',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div className="App">
          <h1>Calendar</h1>
          <MyCalendar />
        </div>
      </Card>

      {/*chart import*/}
      <Card
        style={{
          width: '100%',
          marginTop: 50,
          backgroundColor: 'white',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div>
          <select value={selectedOption} onChange={(event) => newfunction(event.target.value)} style={divStyles}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <p>Selected year: {selectedOption}</p>
        </div>

        <Chart
          chartType="Bar"
          width="100%"
          height="400px" // Let the chart height adjust based on content
          data={barChartData}
          options={{
            ...barChartOptions,
            chartArea: {
              width: '80%', // Adjust the width of the chart area for mobile view
              height: '70%', // Adjust the height of the chart area for mobile view
            },
          }}
        />
      </Card>

      <Card style={{
        display: 'flex',
        flexWrap: 'wrap', // Stack items vertically on mobile
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: "white",
        width: '100%',
        padding: '80px', // Add some padding for spacing
      }}>
        <Chart
          chartType="PieChart"
          height="300px"
          width="100%"
          data={pieChartData}
          options={pieChartOptions}
        />
        <Chart
          chartType="PieChart"
          height="300px"
          width="100%"
          data={pieChartsData}
          options={pieChartsOptions}
        />
      </Card>

      {myUserInfo.role == 'user' ? null :
        <div style={{ marginTop: 50 }}>
          <TableContainer component={Card} style={{ padding: 30 }}>
            <h2 style={{ marginBottom: 30 }}>Recently Registered Users</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>S.No</b></TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Name</b></TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Email</b></TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Phone Number</b></TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Status</b></TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Registered Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {registeredTableData.map((e) => e.map((oe, index) => (
                  <TableRow key={index} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px", width: "50px" }}>{oe.row_number}</TableCell>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.first_name || ''} {oe.last_name || ''}</TableCell>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.email}</TableCell>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_phone}</TableCell>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.status_name}</TableCell>
                    <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_created_at}</TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      }

      <div style={{ marginTop: 50 }}>
        <TableContainer component={Card} style={{ padding: 30 }}>
          <h2 style={{ marginBottom: 30 }}>Due Case List</h2>
          <Table>
            <TableHead variant="subtitle1">
              <TableRow>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Sr.No</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Name</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Date</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Case Type</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Case Number</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Court Name</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Case Stage</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Status</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Fir No.</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Macc No.</b></TableCell>
                <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {dueTableData.map((e) => e.map((oe, index) => (
                <TableRow key={index} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px", width: "50px" }}>{oe.row_number_date}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.full_name}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.date}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.case_type_name}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_case_number}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_court_name}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.stage_names}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.status_name}</TableCell>
                  {/* <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.case_type_name}</TableCell> */}
                  {/* <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_created_at}</TableCell> */}
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_fir_number}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>{oe.formatted_macc_number}</TableCell>
                  <TableCell style={{ border: "1px solid #dddddd", padding: "8px" }}>
                    <IconButton
                      aria-label="view-details"
                      onClick={() => {
                        handleCloseMenu();
                        redirectToStage(oe.case_type_id, oe.uuid);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </>
  );
}

export default Dashboard;
