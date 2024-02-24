import React, { useState } from 'react';
import { View,Button } from 'react-native';
import { COLOR } from '../../constants';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DefaultStyle } from '../../styles/Default';


const ButtonSet = (params) => {
    const [activeChoice, setActive] = useState();
    return (
        <View style={[{ height: 50, flexDirection: 'row' , alignItems: 'center' , justifyContent: 'space-around'}]}>
            <Button 
                color={ activeChoice === 'yes' ? COLOR.darkBlue : 'gray' } 
                title="Yes" 
                style = {[DefaultStyle.button]}
                onPress={() => { params.onChange(true); setActive('yes') }}>
            </Button>
            <Button color={ activeChoice === 'no' ? COLOR.darkBlue : 'gray' } 
                title="No" 
                onPress={() => { params.onChange(true); setActive('no') }}>
            </Button>
        </View>
    );
}


export const SingleButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: "20%",
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ButtonSet;

