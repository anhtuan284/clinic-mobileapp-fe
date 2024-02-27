import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStyles from '../../styles/MyStyles';
import Dict from '../Inputs/Dict';

const PrescriptionDetail = ({ presId, closeModal }) => {
    const [pres, setPres] = React.useState()

    React.useEffect(() => {
        const loadPres = async () => {
            try {
                let value = await AsyncStorage.getItem("access-token");
                let res = await authApi(value).get(endpoints['prescription-details'](presId));
                setPres(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }
        loadPres();
    }, [presId]);

    return (
        
        <View>
            {pres===null?<ActivityIndicator/>:
            <View style={[{width: 250}]}>
                <Text style={[MyStyles.title, {alignSelf: 'center', marginVertical: 10}]}>Prescription Details</Text>
                <Dict tit={"Symtoms"} value={pres?.symptoms}/>
                <Dict tit={"Diagnosis"} value={pres?.diagnosis}/>

                <Text style={MyStyles.title}>{"\n"}Services:</Text>
                {pres?.services.map((service) => (
                <View key={service.id}>
                    <Dict tit={"+ Name"} value={service.name}/>
                    <Dict tit={"-- Price($)"} value={service.price}/>
                </View>
                ))}

                <Text style={MyStyles.title}>{"\n"}Medicines:</Text>
                {pres?.dosages.map((dosage) => (
                <View key={dosage.id} style={[MyStyles.row]}>
                    <Text style={[{fontWeight: 'bold'}]}>{dosage.medicine.name}</Text>
                    <Text style={[{fontWeight: 'bold'}]}>({dosage.quantity}):</Text>
                    <Text>{dosage.dosage} </Text>
                </View>

                ))}
                <Text style={MyStyles.title}>{"\n"}Total:</Text>
                <Text style={MyStyles.title}>{pres?.receipt?.total}$</Text>
            </View>
            }
            <TouchableOpacity style={{alignSelf: 'center', marginVertical: 10, fontWeight: 'bold'}}onPress={closeModal}>
                <Text style={MyStyles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PrescriptionDetail;