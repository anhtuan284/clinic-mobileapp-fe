import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  styleNavigation: {
    height: 70,
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#dadada",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    alignSelf: "stretch",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    color: '#697689',
    position: 'absolute',
    bottom: 20,
}
});