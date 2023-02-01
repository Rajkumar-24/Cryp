import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfoiloAssets";
import { getAllCoins } from "../../services/request";

const items = [
  //name key is must.It is to show the text in front
  { id: 1, name: "angellist" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" },
];

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetsQuantity, setBoughtAssetQuantity] = useState("");
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(false);
  console.log(selectedCoinId);
  const onAddNewAssets = () => {};
  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllCoins();
  }, []);
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <SearchableDropDown
        onTextChange={(text) => setSelectedCoinId(text)}
        onItemSelect={(text) => setSelectedCoinId(text.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{
          color: "white",
        }}
        items={allCoins}
        defaultIndex={2}
        placeholder="placeholder"
        placeholderTextColor="white"
        resetValue={false}
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      <View style={styles.boughtQuantContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ color: "white", fontSize: 90 }}
            value={boughtAssetsQuantity}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAssetQuantity}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.priceperCoin}> $400 per coin</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.butoonContainer,
          pressed ? styles.coinPressed : null,
        ]}
        onPress={onAddNewAssets}
      >
        <Text style={styles.buttonText}>Add new Assets</Text>
      </Pressable>
    </View>
  );
};
export default AddNewAssetScreen;
