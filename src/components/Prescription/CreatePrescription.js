import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { authApi, endpoints } from '../../configs/API';

const CreatePrescription = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);

  const fetchServices = async () => {
    try {
        let res = await API.get(endpoints['services']('1'));
        setServices(res.data.results)
    } catch (ex) {
        setServices([])
        console.error(ex);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setServices([...services, serviceId]);
    setModalVisible(false);
  };

  const createPrescription =  async () => {
    const prescriptionData = {
      symptoms,
      diagnosis,
      patient,
      doctor,
      services,
    };
    try {
        let token = await AsyncStorage.getItem('access-token')
        let res = await authApi(token).get(endpoints['create-prescription'],
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionData),
        })
        if (res.status === 200) {
            Alert.alert("Create Presciption Success")
        }
    }
    catch(ex) {
        console.log(ex)
    }
    
  }

  // Fetch available services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <View>
      <Text>Symptoms:</Text>
      <TextInput value={symptoms} onChangeText={setSymptoms} />

      <Text>Diagnosis:</Text>
      <TextInput value={diagnosis} onChangeText={setDiagnosis} />

      <Text>Patient:</Text>
      <TextInput value={patient} onChangeText={setPatient} />

      <Text>Doctor:</Text>
      <TextInput value={doctor} onChangeText={setDoctor} />

      <Text>Services:</Text>
      <Button title="Select Services" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View>
          <Text>Select Services:</Text>
          {availableServices.map((service) => (
            <TouchableOpacity key={service.id} onPress={() => handleServiceSelect(service.id)}>
              <Text>{service.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Button title="Create Prescription" onPress={createPrescription} />
    </View>
  );
};

export default CreatePrescription;