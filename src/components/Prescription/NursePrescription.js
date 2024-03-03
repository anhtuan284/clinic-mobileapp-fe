import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MyStyles from '../../styles/MyStyles';
import moment from 'moment';
import PrescriptionDetail from './PrescriptionDetail';
import { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Prescription = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedPrescription, setSelectedPrescription] = React.useState('');
    const [pres, setPres] = React.useState(null)

    React.useEffect(() => {
        const loadPres = async () => {
        let url = endpoints['user-pres'];
          
        try {
              let value = await AsyncStorage.getItem("access-token");
              let res = await authApi(value).get(url);
              setPres(res.data);
              console.log(res.data);
          } catch (ex) {
              setPres([]);
              console.error(ex);
          }
      };
      loadPres();
    }, []);

    const openModal =  (prescription) => {
      setSelectedPrescription(prescription);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setSelectedPrescription(null);
      setModalVisible(false);
    };


    const renderItem = ({ item }) => {
        const presViewStyle = item.receipt?.paid ? MyStyles.payView : MyStyles.nopayView

        return (
        
            <TouchableOpacity style={[MyStyles.container]}onPress={() => openModal(item.id)}>
                <View style={[presViewStyle]}>
                    <Text style={{ fontWeight: 'bold' }}>Diagnosis: {item.diagnosis}</Text>
                    <Text>Doctor: {item.doctor.first_name} {item.doctor.last_name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.receipt?.paid?"PAID":"NOT PAID"}</Text>
                    <Text>{moment(item.created_date).fromNow()}</Text>
                </View>
                
            </TouchableOpacity>
        )
    };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>My Prescription</Text>

      {pres===null?<ActivityIndicator />:<>
        <FlatList
          data={pres}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        /></>}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
        <View style={MyStyles.centeredView}>
          <View style={MyStyles.presView}>
            {selectedPrescription !== null && (
                <PrescriptionDetail presId={selectedPrescription} closeModal={closeModal} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Prescription;