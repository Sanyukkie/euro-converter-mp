import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import SelectDropdown from 'react-native-select-dropdown'


var myHeaders = new Headers();
myHeaders.append("apikey", "HR2Ctla5a4oLszFMZjsaYRdVNuoxaVA7");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function App() {
  const [num1, setNum1] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [currencies, setCurrencies] = useState();
  const [result, setResult] = useState([]);

  const convert = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${num1}`, requestOptions)
    .then(response => response.json())
    .then(responseJson => setResult(responseJson.result + " Eur"))
    .catch(error => {Alert.alert('Error', error); });
  }

  const getCurrencies = () => {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.json())
      .then(responseJson => setCurrencies(Object.keys(responseJson.symbols)))
       .catch(error => console.log('Error', error));
  }

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <View style={styles.button_row}>
        <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1}}
          onChangeText={num1 => setNum1(num1)}
          value={num1}
          numeric
          keyboardType={'numeric'}
        />
        <SelectDropdown
          data={currencies}
          buttonStyle={styles.dropdown1BtnStyle}
          onSelect={(selectedItem) => {
            setSelectedCurrency(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
      </View>
      <Button title="Convert" onPress={ convert }/>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 button_row: {
  flexDirection: "row",
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
dropdown1BtnStyle: {
  width: 100,
  height: 20,
  backgroundColor: '#FFF',
},
});