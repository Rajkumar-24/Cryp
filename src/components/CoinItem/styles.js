import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  titile: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "white",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  coinPressed: {
    opacity: 0.9,
    backgroundColor: "#4b4b4bc3",
  },
  rank: {
    fontWeight: "bold",
    color: "white",
    padding: 3,
    fontSize: 10,
  },
  rankContainer: {
    marginRight: 5,
    backgroundColor: "#585858",
    paddingHorizontal: 3,
    borderRadius: 5,
  },
});

export default styles;
