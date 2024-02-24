import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import MyStyles from "../styles/MyStyles"
import React from "react";
import API, { endpoints } from "../configs/API";
import moment from "moment";

export default ServiceScreen = () => {
    const [services, setServices] = React.useState(null);

    React.useEffect(() => {
        const loadService = async () => {
            try {
                let res = await API.get(endpoints['services']('1'));
                setServices(res.data.results)
            } catch (ex) {
                setServices([])
                console.error(ex);
            }
        }
        loadService();
    }, []);

    return (
        <View style={MyStyles.container}>
        <Text style={MyStyles.subject}>Clinic Services</Text>
        <ScrollView>
            {services === null ? <ActivityIndicator /> : <>
                {
                    services.map(s => (
                        <View style={MyStyles.row} key={s.id}>
                            <TouchableOpacity>
                                <Image source={{ uri: 'https://res.cloudinary.com/drbd9x4ha/image/upload/v1708752215/pfqjolfho8lnad5pqqqt.png'}} style={[MyStyles.m_10, { width: 80, height: 80 }]} />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity>
                                    <Text style={[MyStyles.m_10, MyStyles.title]}>{s.name}</Text>
                                    <Text style={[MyStyles.m_10, { maxHeight: 60, overflow: "hidden" }]} numberOfLines={3} ellipsizeMode="tail">Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur </Text>
                                </TouchableOpacity>
                                <Text style={[MyStyles.m_10, {color: "grey", fontStyle: "italic"}]}>{moment(s.created_date).fromNow()}</Text>
                            </View>
                            
                        </View>
                    ))
                }
            </>}
        </ScrollView>
    </View>
    )
}