import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 5,
  },
  boughtQuantContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  butoonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  coinPressed: {
    opacity: 0.75,
  },
  priceperCoin: {
    color: "grey",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 17,
  },
});
export default styles;
