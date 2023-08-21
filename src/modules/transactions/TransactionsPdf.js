import React from 'react';
import moment from 'moment';
import { getPlanType } from 'utils';
import { grey500, primaryBlue } from 'components/globaStyle';
import { Document, Page, StyleSheet, View, Text, Font } from '@react-pdf/renderer';

Font.register({
    family: 'SF Pro Text',
    fonts: [
        { src: `/fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Regular.otf`, fontWeight: 'Normal' },
        { src: `/fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Bold.otf`, fontWeight: 'Bold' },
    ]
})

const styles = StyleSheet.create({
    page: {
        width: '600px',
        padding: '20px',
        height: '400px',
    },

    title: {
        fontSize: '18px',
        fontWeight: 'Bold',
        fontStyle: 'normal',
        marginBottom: '10px',
        fontFamily: 'SF Pro Text',
    },

    table: {
        thead: {
            padding: '6px',
            display: 'flex',
            color: '#FFFFFF',
            fontSize: '10px',
            fontWeight: 'Bold',
            fontStyle: 'normal',
            flexDirection: 'row',
            fontFamily: 'SF Pro Text',
            justifyContent: 'space-between',
            backgroundColor: `${primaryBlue}`,
        },

        tbody: {
            display: 'flex',
            padding: '0 6px',
            flexDirection: 'column',
            justifyContent: 'space-between',

            tr: {
                display: 'flex',
                padding: '6px 0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #E0E0E0',

                td: {
                    width: '16.5%',
                    fontSize: '10px',
                    color: `${grey500}`,
                    fontStyle: 'normal',
                    fontWeight: 'Normal',
                    fontFamily: 'SF Pro Text',
                }
            }
        }
    }
})

const Index = ({ data }) => {

    return (
        <Document>
            <Page style={styles.page} >
                <Text style={styles.title}>Transactions</Text>

                <View style={styles.table}>
                    <View style={styles.table.thead}>
                        <View style={{ width: '16.5%' }}>
                            <Text>Company name</Text>
                        </View>
                        <View style={{ width: '16.5%' }}>
                            <Text>Transaction id</Text>
                        </View>
                        <View style={{ width: '16.5%' }}>
                            <Text>Plan type</Text>
                        </View>
                        <View style={{ width: '16.5%' }}>
                            <Text>Date</Text>
                        </View>
                        <View style={{ width: '16.5%' }}>
                            <Text>Time</Text>
                        </View>
                        <View style={{ width: '16.5%' }}>
                            <Text>Amount</Text>
                        </View>
                    </View>

                    <View style={styles.table.tbody}>
                        {data.map((item, index) => {
                            return (
                                <View key={index} style={styles.table.tbody.tr}>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item.transactionId.length > 10 ? `${item.transactionId.slice(0, 10)}...` : item.transactionId}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{item?.planType?.split(" ")[0]}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{moment(item.date).format('DD MMM YYYY')}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>{moment(item.date, 'HH:mm').format('hh:mm A')}</Text>
                                    </View>
                                    <View style={styles.table.tbody.tr.td}>
                                        <Text>€{Math.floor(item.amount / 100)}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Index