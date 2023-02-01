import { Text, View } from "react-native";
import { LineChart } from "react-native-wagmi-charts";

function Example() {
  const data = [
    {
      timestamp: 1625945400000,
      value: 33575.25,
    },
    {
      timestamp: 1625946300000,
      value: 33545.25,
    },
    {
      timestamp: 1625947200000,
      value: 33510.25,
    },
    {
      timestamp: 1625948100000,
      value: 33215.25,
    },
  ];
  return (
    <View>
      <Text style={{ color: "white" }}>apple</Text>
      <LineChart.Provider data={data}>
        <LineChart>
          <LineChart.Path color="hotpink" />
        </LineChart>
      </LineChart.Provider>
    </View>
  );
}
export default Example;
