import React from 'react';
import moment from 'moment';
import { getPlanType } from './getPlanType';
import { Document, Page, StyleSheet, View, Text, Font } from '@react-pdf/renderer';
import { grey600, grey800, grey900, infoLink, primaryBlue } from 'components/globaStyle';

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
        height: '400px',
    },
    header: {
        color: '#F9FAFB',
        padding: '10px 45px',
        backgroundColor: primaryBlue,

        title: {
            fontSize: '25px',
            fontWeight: 'Bold',
            fontStyle: 'normal',
            fontFamily: 'SF Pro Text',
        }
    },
    body: {
        paddingTop: '60px',

        heading: {
            color: grey900,
            fontSize: '22px',
            fontWeight: 'Bold',
            textAlign: 'center',
            fontStyle: 'normal',
            fontFamily: 'SF Pro Text',
        },

        amount: {
            color: infoLink,
            fontSize: '30px',
            marginTop: '16px',
            fontWeight: 'Bold',
            textAlign: 'center',
            fontStyle: 'normal',
            fontFamily: 'SF Pro Text',
        },

        trscHistory: {
            padding: '48px 45px 0px',

            todayDate: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',

                value: {
                    fontSize: '14px',
                    color: '#374151',
                    fontStyle: 'normal',
                    fontWeight: 'Normal',
                    fontFamily: 'SF Pro Text',
                }
            },

            detail: {
                gap: '40px',
                display: 'flex',
                padding: '36px',
                marginTop: '42px',
                borderRadius: '6px',
                flexDirection: 'column',
                border: '1px solid #E7E7E7',

                layout: {
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    key: {
                        width: '50%',
                        fontSize: '14px',
                        color: '#374151',
                        fontStyle: 'normal',
                        fontWeight: 'Normal',
                        fontFamily: 'SF Pro Text',
                    },

                    value: {
                        width: '50%',
                        color: grey800,
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 'Normal',
                        fontFamily: 'SF Pro Text',
                    }
                },
            }
        }
    },

    footer: {
        marginTop: '60px',
        marginBottom: '16px',

        text: {
            color: grey600,
            fontSize: '12px',
            textAlign: 'center',
            fontStyle: 'normal',
            fontWeight: 'Normal',
            fontFamily: 'SF Pro Text',
        }
    }
})

const Index = ({ data }) => {

    return (
        <Document>
            <Page style={styles.page} >
                <View style={styles.header}>
                    <Text style={styles.header.title}>TIRminator</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.body.heading}>Transaction receipt</Text>
                    <Text style={styles.body.amount}>€{Math.floor(data.amount / 100)}</Text>

                    <View style={styles.body.trscHistory}>
                        <View style={styles.body.trscHistory.todayDate}>
                            <Text style={styles.body.trscHistory.todayDate.value}>{moment().format('DD MMM YYYY')}</Text>
                            <Text style={styles.body.trscHistory.todayDate.value}>{moment().format('h:mm A')}</Text>
                        </View>

                        <View style={styles.body.trscHistory.detail}>
                            <View style={styles.body.trscHistory.detail.layout}>
                                <Text style={styles.body.trscHistory.detail.layout.key}>Company name</Text>
                                <Text style={styles.body.trscHistory.detail.layout.value}>{data.name} truck company</Text>
                            </View>
                            <View style={styles.body.trscHistory.detail.layout}>
                                <Text style={styles.body.trscHistory.detail.layout.key}>Transaction id</Text>
                                <Text style={styles.body.trscHistory.detail.layout.value}>{data.transactionId}</Text>
                            </View>
                            <View style={styles.body.trscHistory.detail.layout}>
                                <Text style={styles.body.trscHistory.detail.layout.key}>Plan type</Text>
                                <Text style={styles.body.trscHistory.detail.layout.value}>{getPlanType(data?.planType)}</Text>
                            </View>
                            <View style={styles.body.trscHistory.detail.layout}>
                                <Text style={styles.body.trscHistory.detail.layout.key}>Date</Text>
                                <Text style={styles.body.trscHistory.detail.layout.value}>{moment(data?.date).format('DD MMM YYYY')}</Text>
                            </View>
                            <View style={styles.body.trscHistory.detail.layout}>
                                <Text style={styles.body.trscHistory.detail.layout.key}>Time</Text>
                                <Text style={styles.body.trscHistory.detail.layout.value}>{moment(data?.date, 'HH:mm').format('hh:mm A')}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footer.text}>© 2023 TIRminator. All right reserved</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Index