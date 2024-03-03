import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import { TouchableOpacity,Linking, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStyles from '../../styles/MyStyles';
import Dict from '../Inputs/Dict';



const PrescriptionDetail = ({ presId, closeModal }) => {
    const [pres, setPres] = React.useState()
    const [payUrl, setPayUrl] = React.useState(null);
    const desktopUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

  
    const handleUrlChange = (event) => {
        console.log(environment.url)
        const newUrl = event.url;
        // Kiểm tra nếu URL chứa thông tin xác nhận thanh toán thành công
        if (newUrl.includes('resultCode=0')) {
            // Cập nhật trạng thái 'paid' của đơn thuốc
            setPres({ ...pres, receipt: { ...pres.receipt, paid: true } });
        }
    };
    const handlePayment = async () => {
    try {
        // Retrieve access token from AsyncStorage
        const token = await AsyncStorage.getItem("access-token");

        // Define the payment data
        const paymentData = {
            amount: pres?.receipt?.total // Amount value as required
        };

        // Make a POST request to the payment API endpoint
        const response = await fetch('http://192.168.1.219:8000/process_payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.payUrl) {
                await Linking.openURL(responseData.payUrl, { userAgent: desktopUserAgent });
                handleUrlChange()
                console.log(responseData.payUrl)
            }
            console.log(222);

            // Handle successful payment response
            console.log("Payment successful");
            // You may want to update the UI or perform additional actions here
        } else {
            // Handle payment failure or other errors
            console.error("Payment failed");
            // You may want to display an error message to the user
        }
    } catch (error) {
        console.error("Error occurred during payment:", error);
    }
};
    React.useEffect(() => {
        const loadPres = async () => {
            try {
                let value = await AsyncStorage.getItem("access-token");
                let res = await authApi(value).get(endpoints['prescription-details'](presId));
                setPres(res.data);

                // If the response contains payUrl, store it in state
           

                
            } catch (ex) {
                console.error(ex);
            }
        }
        loadPres();
    }, [presId]);
    const handleOpenPayUrl =async () => {
        if (payUrl) {
            openBrowserAsync(payUrl); // Mở URL trong trình duyệt web
            console.log(payUrl)
        }
    };
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
            {!pres?.receipt?.paid && (
    <TouchableOpacity  style={MyStyles.buttonPayMomo} onPress={handlePayment}>
        <Text style={MyStyles.payMentText}>Pay with Momo</Text>
    </TouchableOpacity>)}

            <TouchableOpacity style={{alignSelf: 'center', marginVertical: 10, fontWeight: 'bold'}}onPress={closeModal}>
                <Text style={MyStyles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PrescriptionDetail;
// import React from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import API, { authApi, endpoints } from '../../configs/API';
// import { TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyStyles from '../../styles/MyStyles';
// import Dict from '../Inputs/Dict';

// const PrescriptionDetail = ({ presId, closeModal }) => {
//     const [pres, setPres] = React.useState()

//     React.useEffect(() => {
//         const loadPres = async () => {
//             try {
//                 let value = await AsyncStorage.getItem("access-token");
//                 let res = await authApi(value).get(endpoints['prescription-details'](presId));
//                 setPres(res.data);
//             } catch (ex) {
//                 console.error(ex);
//             }
//         }
//         loadPres();
//     }, [presId]);

//     return (
        
//         <View>
//             {pres===null?<ActivityIndicator/>:
//             <View style={[{width: 250}]}>
//                 <Text style={[MyStyles.title, {alignSelf: 'center', marginVertical: 10}]}>Prescription Details</Text>
//                 <Dict tit={"Symtoms"} value={pres?.symptoms}/>
//                 <Dict tit={"Diagnosis"} value={pres?.diagnosis}/>

//                 <Text style={MyStyles.title}>{"\n"}Services:</Text>
//                 {pres?.services.map((service) => (
//                 <View key={service.id}>
//                     <Dict tit={"+ Name"} value={service.name}/>
//                     <Dict tit={"-- Price($)"} value={service.price}/>
//                 </View>
//                 ))}

//                 <Text style={MyStyles.title}>{"\n"}Medicines:</Text>
//                 {pres?.dosages.map((dosage) => (
//                 <View key={dosage.id} style={[MyStyles.row]}>
//                     <Text style={[{fontWeight: 'bold'}]}>{dosage.medicine.name}</Text>
//                     <Text style={[{fontWeight: 'bold'}]}>({dosage.quantity}):</Text>
//                     <Text>{dosage.dosage} </Text>
//                 </View>

//                 ))}
//                 <Text style={MyStyles.title}>{"\n"}Total:</Text>
//                 <Text style={MyStyles.title}>{pres?.receipt?.total}$</Text>
//             </View>
//             }
//             <TouchableOpacity style={{alignSelf: 'center', marginVertical: 10, fontWeight: 'bold'}}onPress={closeModal}>
//                 <Text style={MyStyles.confirmText}>Confirm</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default PrescriptionDetail;