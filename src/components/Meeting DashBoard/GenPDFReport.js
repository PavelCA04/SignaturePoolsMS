import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Swal from 'sweetalert2';

const showGeneratePdfPopup = (meetingData) => {
  Swal.fire({
    title: 'Generate PDF Report',
    text: 'Select the date range for the meetings report.',
    color: '#fff',
        //imageUrl: 'C:Users\pavel\Downloads\pdf-icon-vector-25322907.jpg',
    //imageHeight: 80, // Adjust as needed
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
      </div>
    `,
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
    }, 3000); // Simulated delay
  });
};

// Define styles for the PDF document
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
