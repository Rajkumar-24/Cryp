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
    padding: 15,
  },
  coinPressed: {
    opacity: 0.9,
    backgroundColor: "#959090c3",
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
  mainContainer: {
    backgroundColor: "#880e4f",
    margin: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

export default styles;
