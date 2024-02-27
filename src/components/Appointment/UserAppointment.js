import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import axios from 'axios'; // Import axios để gửi yêu cầu HTTP
import { authApi, endpoints } from "../../configs/API";
import { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';

 
export default UserAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [user,] = useContext(MyContext)

  const handleChange = (propDate) => {
    setDate(propDate);
  }

  useEffect(() => {
    const fetchAppointment = async () => {
        const form = {
            "user": user.id
        }
        try {
        console.log(form);
        const token = await AsyncStorage.getItem('access-token')
        const response = await authApi(token).get(endpoints['get-user-appointment']);
        console.log(response.data);
        if (response.data) {
          setAppointment(response.data);   
        } else {
          console.log("Không có cuộc hẹn nào.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cuộc hẹn: ", error);
      }
    };
    fetchAppointment();
  }, []);

  
  const createAppointment = async () => {
    if (!date) {
      console.log("Please select a date.");
      return;
    }
  
    const formattedDate = date.replace(/\//g, '-');
    try {

      const token = await AsyncStorage.getItem("access-token");
      console.log(token);
      console.log(formattedDate);

      const response = await authApi(token).post(endpoints['create-appointment'], {
        "scheduled_date": formattedDate, 
      });
      console.log(formattedDate);
      console.log(response.data); // In thông tin lịch hẹn mới tạo từ phản hồi của API
      setAppointment(response.data); // Cập nhật state với thông tin lịch hẹn mới
      setOpen(false); // Ẩn Date Picker sau khi đã tạo lịch hẹn thành công
    } catch (error) {
      console.error("Error creating appointment: ", error);
    }
  };

  const handleCancelAppointment = async () => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel the appointment?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('access-token');
              const response = await authApi(token).patch(endpoints['user-cancel'](appointment.id));
              if (response.status === 200) {
                setAppointment(null);
              } else {
                console.log('No appointment found.');
              }
            } catch (error) {
              console.error('Error cancelling appointment: ', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
  return (
    <View style={styles.container}>
      {appointment ? (
        <View>
          <Text style={styles.heading}>Your Scheduled Appointment:</Text>
          <View style={styles.appointment}>
            {appointment.order_number && <Text style={[MyStyles.orderNum]}>0{appointment.order_number}</Text>}
            <Text>Created date: {appointment.created_date}</Text>
            <Text>Scheduled date: {appointment.scheduled_date}</Text>
            <Text style={{fontWeight: 'bold'}}>Status: {appointment.status}</Text>
            <TouchableOpacity onPress={handleCancelAppointment} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.center}>
            <TouchableOpacity style={styles.createButton} onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}>Select Date</Text>
            </TouchableOpacity>
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
                        onDateChange={handleChange}
                        />
                        <View style={[MyStyles.row, {gap: 60}]}>
                            <TouchableOpacity onPress={() => setOpen(!open)}>
                                <Text style={[MyStyles.confirmText,{color: 'grey'}]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={createAppointment}>
                                <Text style={MyStyles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
      )}
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
