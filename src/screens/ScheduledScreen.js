import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MyStyles from "../styles/MyStyles"
import DatePicker from "react-native-modern-datepicker"
import React from "react";
import Style from "../components/User/Style";
import { getFormatedDate } from "react-native-modern-datepicker";
import { authApi, endpoints } from "../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../configs/MyContext";

export default ScheduledScreen = () => {

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState(startDate)
    const [user, ] = React.useContext(MyContext)

    const handleChange = (propDate) => {
        setDate(propDate)
    }
    

    const createAppointment = async () => {
        const formattedDate = date.replace(/\//g, '-');
        console.log(user.id)
        try {
            let new_appointment = await AsyncStorage.getItem("access-token").then((value) => {
                authApi(value).post(endpoints['create-appointment'], {
                    "scheduled_date": formattedDate, 
                });
            }).data
            console.log(new_appointment)
        }catch(ex) {
            console.log(ex)
        }
        finally {
            console.log("Appointment created successfully!")
        }
    }
    return (
        <View style={MyStyles.container}>
            <TouchableOpacity style={Style.button} onPress={() => setOpen(!open)}>
                <Text>Select Date</Text>
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
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <Text style={MyStyles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={createAppointment}>
                <Text style={MyStyles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};
