import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#0E0E10",
    margin: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#343434",
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
});

export default styles;
