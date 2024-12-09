import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";

const Dropdowns = () => {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([]);
  // { label: "التحدث مع قواعد البيانات", value: 2 },
  // { label: "التحدث مع الملفات", value: 1 },
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChangeValue1 = () => {

  }
 const submitForm=()=>{
      router.replace('ChatPage');

}
  return (
    <View style={styles.container}>
      <View style={[styles.dropdownContainer, { zIndex: open1 ? 4 : 0 }]}>
        <Text style={styles.label}>القطاع</Text>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="اختر القطاع"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          onChangeValue={handleChangeValue1}
        />
      </View>

      <View style={[styles.dropdownContainer, { zIndex: open2 ? 3 : 0 }]}>
        <Text style={styles.label}>الإدارة</Text>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          placeholder="اختر الإدارة"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
        />
      </View>

      <View style={[styles.dropdownContainer, { zIndex: open3 ? 2 : 0 }]}>
        <Text style={styles.label}>الموضوع</Text>
        <DropDownPicker
          open={open3}
          value={value3}
          items={items3}
          setOpen={setOpen3}
          setValue={setValue3}
          setItems={setItems3}
          placeholder="اختر الموضوع"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
        />
      </View>

      <View style={[styles.dropdownContainer, { zIndex: open4 ? 1 : 0 }]}>
        <Text style={styles.label}>البيان</Text>
        <DropDownPicker
          open={open4}
          value={value4}
          items={items4}
          setOpen={setOpen4}
          setValue={setValue4}
          setItems={setItems4}
          placeholder="اختر البيان"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          onChangeValue={(e)=> console.log(e)} 
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitForm}
      >
        <Text style={styles.submitButtonText}>دخول</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    direction: "rtl",
  },
  dropdownContainer: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#777777",
  },
  dropdown: {
    borderColor: "#2579A7",
  },
  dropdownBox: {
    borderWidth: 0,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#2579A7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dropdowns;
