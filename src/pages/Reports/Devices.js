import React, {useEffect, useState} from 'react'
import {API} from '../../components/API'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import {Table, TableHeader, TableCell, DataTableCell, TableBody} from "@david.kucsai/react-pdf-table";

export function DevicesRep() {
  const [data, setData] = useState([]);

  const getData= async () => {
  const res = await fetch(`${API}/consults/devices`)
  const data = await res.json()
  setData(data)
  console.log("data", data)
  }
  useEffect(() => {
   getData()
  }, [])

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    title:{
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        
    },
    table: {
        textAlign: 'center',
        fontStyle: 'bold',
    },

    tableBody: {
        fontSize: 10,
        textAlign: 'center',
        fontStyle: 'bold',
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    nameGym: {
        fontSize: 17,
        marginBottom: 20,
        marginTop:20
    },

  });

return (
<>
<Document name="ClassbyInst">
<Page size="A4" style={styles.page} title="Class by Instructor">
  <View style={styles.section}>
    <Text style={styles.title}>Devices</Text>
    <Table
            data={data}
            
        >
            <TableHeader>
                <TableCell style={styles.table}>
                    Device
                </TableCell>
                <TableCell style={styles.table}>
                    Status
                </TableCell>
                <TableCell style={styles.table}>
                    ID Room
                </TableCell>
               

            </TableHeader>
            <TableBody>
                <DataTableCell getContent={(r) => r.descr}  style={styles.tableBody}/>
                <DataTableCell getContent={(r) => r.st}  style={styles.tableBody}/>
                <DataTableCell getContent={(r) => r.room_id}  style={styles.tableBody}/>
                
            </TableBody>
        </Table>
        <Text></Text>
        <Text style={styles.nameGym}>Always In Shape</Text>
  </View>
</Page>
</Document>
</>
)
}