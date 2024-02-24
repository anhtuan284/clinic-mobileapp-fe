// LoadingPage.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultStyle } from "../../styles/Default";

export default LoadingPage = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={DefaultStyle.flexBoxCol}>
        <Image
          source={require("../../assets/images/loading.gif")}
          style={styles.loadingImage}
        />
        <Text style={styles.loadingText}>Connecting the app...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImage: {
    width: 120,
    height: 120,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

