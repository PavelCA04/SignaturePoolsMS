import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Swal from 'sweetalert2';

const fileDocsvgIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 21H6C5.44772 21 5 20.5523 5 20L5 4C5 3.44772 5.44772 3 6 3L13.5631 3C13.8416 3 14.1076 3.11619 14.2968 3.32059L18.7338 8.11246C18.9049 8.29731 19 8.53995 19 8.79187L19 20C19 20.5523 18.5523 21 18 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 17H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 14H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 9L14 9C13.4477 9 13 8.55228 13 8L13 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

const fileDownsvgIcon =`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L12 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 16L12 18L9 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 21H6C5.44772 21 5 20.5523 5 20L5 4C5 3.44772 5.44772 3 6 3L13.5631 3C13.8416 3 14.1076 3.11619 14.2968 3.32059L18.7338 8.11246C18.9049 8.29731 19 8.53995 19 8.79187L19 20C19 20.5523 18.5523 21 18 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 9L14 9C13.4477 9 13 8.55228 13 8L13 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const showGeneratePdfPopup = (meetingData) => {
  Swal.fire({
    title: 'Generate PDF Report',
    text: 'Select the date range for the meetings report.',
    color: '#fff',
    showCancelButton: true,
    confirmButtonText: 'Generate Report',
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    customClass: {
      popup: 'darkblue-popup',
      cancelButton: 'button muted-button',
    },
    html: `
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="margin-bottom: 10px;">
          <label for="start-date">Start Date:</label>
          <input type="date" id="start-date" class="swal2-input" style="width: 385px;" />
        </div>
        <div>
          <label for="end-date">End Date:</label>
          <input type="date" id="end-date" class="swal2-input" style="width: 385px;" />
        </div>
        ${fileDocsvgIcon}
      </div>
    ` ,
  }).then((result) => {
    if (result.isConfirmed) {
      const startDate = document.getElementById('start-date').value;
      const endDate = document.getElementById('end-date').value;

      if (startDate && endDate) {
        if (new Date(startDate) <= new Date(endDate)) {
          Swal.fire({
            title: 'Generating PDF Report...',
            text: 'Please wait while your report is being generated.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading(); // Show loading spinner
            },
            customClass: {
              popup: 'darkblue-popup',
            },
          });
          generatePdfReport(meetingData, startDate, endDate)
            .then((successMessage) => {
              Swal.fire({
                icon: 'success',
                title: 'PDF Generated',
                text: successMessage,
                confirmButtonText: 'Download PDF',
                customClass: {
                  popup: 'darkblue-popup',
                },
                html: `${fileDownsvgIcon}`,
              });
            })
            .catch((errorMessage) => {
              Swal.fire({
                icon: 'error',
                title: 'Error Generating PDF',
                text: errorMessage,
                confirmButtonText: 'Okay',
                customClass: {
                  popup: 'darkblue-popup',
                  confirmButton: 'button muted-button',
                },
              });
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Date Range',
            text: 'Start date cannot be after end date.',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'darkblue-popup',
              confirmButton: 'button muted-button',
            },
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Dates',
          text: 'Please select both a start and end date.',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'darkblue-popup',
            confirmButton: 'button muted-button',
          },
        });
      }
    }
  });
};

const generatePdfReport = (meetingData, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate generating the PDF
      const success = Math.random() > 0.1; // 90% chance of success
      if (success) {
        resolve("PDF report generated successfully.");
      } else {
        reject("Failed to generate PDF report.");
      }
    }, 3000); 
  });
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderRight: 1,
    borderBottom: 1,
  },
});

// Define the MeetingReport component
const MeetingReport = ({ meetings }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Meeting Report</Text>
          {meetings.length > 0 ? (
            <View style={styles.table}>
              {meetings.map((meeting) => (
                <View style={styles.tableRow} key={meeting.id}>
                  <Text style={styles.tableCell}>{meeting.id}</Text>
                  <Text style={styles.tableCell}>{meeting.name}</Text>
                  <Text style={styles.tableCell}>{meeting.date}</Text>
                  <Text style={styles.tableCell}>{meeting.participants.join(', ')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No meetings found</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export { showGeneratePdfPopup, MeetingReport };
