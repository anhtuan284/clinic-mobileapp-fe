import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, ActivityIndicator } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from '../../configs/API';
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';

 
const NurseAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [user,] = React.useContext(MyContext)   
  const [sort, setSort] = useState({
    "selected_date": "2024-02-28",
    "status": "pending"
  });


  useEffect(() => {
    const fetchAppointment = async () => {
        let form = new FormData();
        for (let key in sort)
          form.append(key, sort[key]);
        try {
        console.log(form);
        const token = await AsyncStorage.getItem('access-token')
        const response = await authApi(token).get(endpoints['get-list-pending'], sort, {headers: {'Content-Type': 'application/json'}});
        console.log(response.data);
        if (response.data) {
          setAppointment(response.data);    
        } else {
          console.log("Không có cuộc hẹn nào đang chờ xác nhận.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cuộc hẹn: ", error);
      }
    };
    fetchAppointment();
  }, [sort]);

  
  const handleSelectDate = async () => {
    if (!date) {
      console.log("Please select a date.");
      return;
    }
    const formattedDate = date.replace(/\//g, '-');
    setDate(formattedDate)
    setSort({...sort, selected_date: formattedDate})
    console.log(sort)
  };

  const handelStatusChange = async () => {
    try {
        const token = await AsyncStorage.getItem('access-token')
        const response = await authApi(token).patch(endpoints['status-change-cancel'](appointment.id));
        if (response.status === 200) {
          Alert.alert("Hủy thành công lịch hẹn")
          
        } else {
          console.log("Không có cuộc hẹn nào.");
          setAppointment([])
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cuộc hẹn: ", error);
      }
  };

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')


  return (
    <View style={styles.container}>
      <ScrollView>
        {appointment === null ? <ActivityIndicator /> : <>
          {
            appointment.map(c => (
              <View style={styles.appointment}>
                {appointment.order_number && <Text style={[MyStyles.orderNum]}>0{appointment.order_number}</Text>}
                <Text style={{fontWeight: 'bold'}}>Patient: {appointment.patient.first_name} {appointment.patient.first_name}</Text>
                <Text>Created date: {appointment.created_date}</Text>
                <Text>Scheduled date: {appointment.scheduled_date}</Text>
                <Text style={{fontWeight: 'bold'}}>Status: {appointment.status}</Text>
                <View styles={[MyStyles.row]}>
                  <TouchableOpacity onPress={handelStatusChange} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>A</Text>
                  </TouchableOpacity>
                  {appointment.order_numer &&
                    <TouchableOpacity onPress={handleCancelAppointment} style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Cancel Appointment</Text>
                    </TouchableOpacity>
                  }
                </View>

                {/* MODAL SELECT DAY TO SORT */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={open}
                  >
                    <View style={MyStyles.centeredView}>
                          <View style={MyStyles.modalView}>
                              <DatePicker
                              mode="calendar"
                              minimumDate={startDate}
                              selected={date}
                              onDateChange={handleSelectDate}
                              />
                              <View style={[MyStyles.row, {gap: 60}]}>
                                  <TouchableOpacity onPress={() => setOpen(!open)}>
                                      <Text style={[MyStyles.confirmText,{color: 'grey'}]}>Cancel</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={handleCancelAppointment}>
                                      <Text style={MyStyles.confirmText}>Confirm</Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  </Modal>
              </View>
            ))
            }
          </>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    appointment: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    createButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default NurseAppointment;