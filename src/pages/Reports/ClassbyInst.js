import React, {useState, useEffect} from 'react'
import {API} from '../../components/API'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import {Table, TableHeader, TableCell, DataTableCell, TableBody} from "@david.kucsai/react-pdf-table";

export function ClassbyInst() {

    const [data, setData] = useState([])

    const getData= async () => {
    const res = await fetch(`${API}/consults/classbyinst`)
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
            
        }

      });

  return (
    <>
    <Document>
    <Page size="A4" style={styles.page} title="Class by Instructor">
      <View style={styles.section}>
        <Text style={styles.title}>Class by Instructor</Text>
        <Table
                data={data}
            >
                <TableHeader>
                    <TableCell>
                        First Name
                    </TableCell>
                    <TableCell>
                        Last Name
                    </TableCell>
                    <TableCell>
                        DOB
                    </TableCell>
                    <TableCell>
                        Country
                    </TableCell>
                    <TableCell>
                        Phone Number
                    </TableCell>
                </TableHeader>
                <TableBody>
                    <DataTableCell getContent={(r) => r.name}/>
                    <DataTableCell getContent={(r) => r.phone}/>
                    <DataTableCell getContent={(r) => r.experience}/>
                    <DataTableCell getContent={(r) => r.degree}/>
                    <DataTableCell getContent={(r) => r.sheduleC}/>
                </TableBody>
            </Table>
      </View>
    </Page>
  </Document>
  </>
  )
}
