import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, Modal } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from '../configs/API'; // Thay đổi đường dẫn tới file API của bạn
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logout from '../components/User/Logout';
import { useContext } from 'react/cjs/react.production.min';
import MyContext from '../configs/MyContext';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import MyStyles from '../styles/MyStyles';

const ProfileScreen = () => {
  const [user,dispatch] = React.useContext(MyContext)
  const [notificationActive, setNotificationActive] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('')
  const [changeEmailVisible, setChangeEmailVisible] = useState(false); // Khai báo biến và đặt giá trị ban đầu là false
  const [avatar, setAvatar] = useState(''); // State để lưu trữ đường dẫn của ảnh đại diện
  const [showImgPreview, setShowImgPreview] = useState(false)

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission Denied!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setAvatar(result.assets[0]);
        handleAvatarUpdate() // Update avatar state with the URI of the selected image
        // handleAvatarUpdate(); // Call handleAvatarUpdate to update the avatar on the backend
      }
    }
  };
  

  const handleAvatarUpdate = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access-token");
      const form = new FormData();

        form.append('avatar', {
            uri: avatar.uri,
            name: avatar.fileName,
            type: avatar.type
        })
          
      const response =  await authApi(accessToken).patch(endpoints['update'](user.id), form);

      if (response.status === 200) {
        setShowImgPreview(true)
      } else {
        Alert.alert('Error', 'Failed to update avatar.');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      Alert.alert('Error', 'Failed to update avatar. Please try again.');
    }
  };

  const handleChangeEmail = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access-token");
      const api = await authApi(accessToken);
      const data = new FormData();
      data.append('email', newEmail,);
 

  
      const response = await api.patch(endpoints['update'](user.id), data);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Email changed successfully.');
        setNewEmail(''); // Reset input field
        dispatch({
          type: "update",
          payload: {...user , 'email': newEmail}
        })
      } else {
        Alert.alert('Error', 'Failed to change email.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change email. Please try again.');
    }
  };

  const handlePressChangeEmail = () => {
    setChangeEmailVisible(!changeEmailVisible); // Hiển thị form khi người dùng nhấn vào nút "Change Email"
  };

  const refreshAvatar = async () => {
    await handleAvatarUpdate()
    let token = await AsyncStorage.getItem('access-token')
    let updated_user = await authApi(token).get(endpoints['current-user']);
    dispatch({
        type: "login",
        payload: updated_user.data
    });
    setShowImgPreview(false)    
    Alert.alert('Success', 'Avatar updated successfully.');

  }

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
  
      const accessToken = await AsyncStorage.getItem("access-token");
      const api = await authApi(accessToken);
  
      const data = new FormData();
      data.append('old_password', oldPassword,);
      data.append('new_password', newPassword,);
  
      const response = await api.patch(endpoints['change-password'], data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
       
        Alert.alert('Success', 'Password changed successfully.',);
        const logout = () => {
          dispatch({
              "type": "logout"
          }) }
        logout();
      } else {
        Alert.alert('Error', 'Failed to change password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };


  const handlePressChangePassword = () => {
    setChangePasswordVisible(!changePasswordVisible);
  };

  const toggleNotification = () => {
    setNotificationActive(!notificationActive); 
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {user && (
          <>
            <TouchableOpacity onPress={pickImage}>
            <Image
                source={{ uri: user.avatar}} // Sử dụng đường dẫn ảnh mới nếu có, ngược lại sử dụng ảnh đại diện hiện tại của user
                style={styles.avatar}
              />
            </TouchableOpacity>
           
           
            <Modal
            animationType="slide"
            transparent={true}
            visible={showImgPreview}
            >
                <View style={[MyStyles.centeredView, {padding: 20}]}>
                    <View style={MyStyles.modalView}>
                        <Image
                        source={{ uri: avatar.uri}} // Sử dụng đường dẫn ảnh mới nếu có, ngược lại sử dụng ảnh đại diện hiện tại của user
                        style={styles.avatar}
                    />
                    <TouchableOpacity onPress={refreshAvatar}>
                        <Text style={[MyStyles.title]}>CONFIRM</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text style={styles.fullName}>{user.first_name} {user.last_name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePressChangePassword}>
              <Text style={styles.actionButtonText}>Change Password</Text>
              <Image
                source={require('../assets/images/a.png')}
                style={[styles.icon, styles.changePassIcon]}
              />
            </TouchableOpacity>

            {/* Change Password form */}
            {changePasswordVisible && (
              <View style={styles.changePasswordForm}>
                  <TextInput
                  style={styles.input}
                  placeholder="Old Password"
                  placeholderTextColor="#4b4a4a"
                  secureTextEntry
                  onChangeText={setOldPassword}
                  value={oldPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor="#4b4a4a"
                  secureTextEntry
                  onChangeText={setNewPassword}
                  value={newPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm New Password"
                  placeholderTextColor="#4b4a4a"
                  secureTextEntry
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleChangePassword}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
            
           
           {/* Button "Change Email" */}
           <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePressChangeEmail}>
              <Text style={styles.actionButtonText}>Change Email</Text>
              <Image
                source={require('../assets/images/a.png')}
                style={[styles.icon, styles.changePassIcon]}
              />
            </TouchableOpacity>

            {/* Form thay đổi email */}
            {changeEmailVisible && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="New Email"
                  placeholderTextColor="#4b4a4a"
                  onChangeText={setNewEmail}
                  value={newEmail}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleChangeEmail}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
            <View style={[styles.infoContainer]}
            >
              <Text style={styles.actionButtonText}>Notification</Text>
              <TouchableOpacity
                style={[styles.notificationButton, notificationActive && styles.notificationButtonActive]}
                onPress={toggleNotification}>
                <View style={[styles.notificationIndicator, notificationActive && styles.notificationIndicatorActive]} />
              </TouchableOpacity>
            </View>
            <Logout ></Logout>    
            <View style={{paddingBottom:150}}></View>

          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 70,
    color: '#75a8e7',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b4a4a',
  },
  value: {
    fontSize: 16,
    color: '#7aa0c4',
  },
  actionButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#4b4a4a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    // Các style chung cho icon
    width: 24,
    height: 24,
    // Các style khác nếu cần
  },
  notificationButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButtonActive: {
    backgroundColor: '#75a8e7',
  },
  notificationIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#75a8e7',
    transform: [{ translateX: -10 }],

  },
  notificationIndicatorActive: {
    backgroundColor: '#ddd',
    transform: [{ translateX: 10 }],
  },
  changePasswordForm: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#75a8e7',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;