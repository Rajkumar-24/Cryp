import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceChange: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 18,
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20,
  },
  candleStickText: {
    color: "white",
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  candleStickTExtLabel: {
    color: "grey",
    fontSize: 13,
  },
  candleStickTExtData: {
    color: "grey",
    fontSize: 13,
    marginTop: 5,
  },
});
export default styles;
