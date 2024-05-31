// DocumentPDF.jsx
import React, { Fragment } from 'react';
import { Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';

const DocumentPDF = ({ data, startDate, endDate }) => {
    const formatDate = (date) => {  
        console.log(date);
        const datePart = date.slice(0, 10);
        
        const timePart = date.slice(11, 16);
        
        return `${datePart} ${timePart}`;
    };

  const styles = StyleSheet.create({
    page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column', backgroundColor: '#0D0B14' },
    spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'left', justifyContent: 'space-between', color: "#BEC2DA" },
    titleContainer: { flexDirection: 'row', marginTop: 24 },
    informationContainer: {
        flexDirection: 'row', 
        marginTop: 12
    },
    reportTitle: { fontSize: 24, textAlign: 'center', color: '#BEC2DA' },
    addressTitle: { fontSize: 11, fontStyle: 'bold' },
    invoice: { fontWeight: 'bold', fontSize: 16 },
    invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
    address: { fontWeight: 400, fontSize: 10 },
    theader: { 
        marginTop: 20, 
        fontSize: 10, 
        fontStyle: 'bold', 
        paddingTop: 4, 
        paddingLeft: 7, 
        flex: 1, 
        height: 20, 
        backgroundColor: '#100E17', 
        borderColor: '#9A9A9A', 
        color: '#BEC2DA',
        borderRightWidth: 1, 
        borderBottomWidth: 1 },
    theader2: { 
        flex: 2, 
        borderRightWidth: 1, 
        borderBottomWidth: 1 
    },
    tbody: { 
        fontSize: 9, 
        paddingTop: 4, 
        paddingLeft: 7, 
        flex: 1, 
        borderColor: '#9A9A9A', 
        borderColor: '#9A9A9A', 
        color: '#BEC2DA',
        borderRightWidth: 1, 
        borderBottomWidth: 1
    },
    tbody2: { 
        flex: 2, borderRightWidth: 1
    },
    text:{
      fontSize: 9, 
      paddingTop: 10, 
      paddingBottom: 4, 
      paddingLeft: 7, 
      flex: 1,
      color: '#BEC2DA',
      borderColor: '#9A9A9A', 
      borderBottomWidth: 1,
      flexDirection: 'row', 
      justifyContent: 'left',
    }

  });

  const DocumentTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Text style={styles.reportTitle}>Signature Pools</Text>
      </View>
    </View>
  );

  const Information = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Meetings Report</Text>
          <Text style={styles.invoiceNumber}>Start Date: {startDate}</Text>
          <Text style={styles.invoiceNumber}>End Date: {endDate}</Text>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.theader}>
        <Text>Name</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Description</Text>
      </View>
      <View style={styles.theader}>
        <Text>Location</Text>
      </View>
      <View style={styles.theader}>
        <Text>Date</Text>
      </View>
    </View>
  );

  const TableBody = () =>{
    if (data.length > 0) {
      return (data.map((meeting, i) => (
        <Fragment key={meeting.id}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={styles.tbody}>
            <Text>{meeting.name}</Text>
          </View>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{meeting.description}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{meeting.location}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatDate(meeting.date)}</Text>
          </View>
        </View>
      </Fragment>
      )));
    }
    console.log('outside bitch');
    return (
      <Fragment key={0}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={styles.text}>
          <Text>{`There are no meetings in this time period...`}</Text>
        </View>
      </View>
    </Fragment>
    );
  }

  

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <DocumentTitle />
        <Information />
        <TableHead />
        <TableBody />
      </Page>
    </Document>
  );
};

export default DocumentPDF;
