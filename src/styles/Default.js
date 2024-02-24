import { StyleSheet } from "react-native";

export const DefaultStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  fontSizeDeault: {
    fontSize: 14,
  },
  flexBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexBoxCol: {
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  FontSizeLarge: {
    fontSize: 24,
  },
  FontSizeMedium: {
    fontSize: 16,
  },
  fontSizeSmall: {
    fontSize: 14,
  },
  textCenter: {
    textAlign: "center",
  },
  bold700: {
    fontWeight: "700",
  },
  imageUsers: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  imageUserPost:{
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "cover",
  },
  button: {
    width: "30%",
    alignItems:"center",
    textAlign: "center",
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  }, 
  avatar: {
      width: 80,
      height: 80,
      margin: 5
  }, 
  text: {
      alignContent: "center",
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
