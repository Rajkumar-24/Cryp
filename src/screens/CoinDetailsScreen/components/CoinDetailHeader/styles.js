import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tickerTitle: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
    fontSize: 17,
  },
  rankContianer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  iconPressed: {
    opacity: 0.9,
    backgroundColor: "red",
  },
});
export default styles;
