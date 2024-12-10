import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import api from "../../api";

const Dropdowns = () => {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([{ label: "التحدث مع قواعد البيانات", value: 2 },
    { label: "التحدث مع الملفات", value: 1 },]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([]);
  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState(null);
  const [items5, setItems5] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

 const submitForm=()=>{
    if (!value1 || !value2 || !value3 || !value4 ){
      setError("Please Select Item");
    } else {
      console.log(value5)
      router.replace({pathname:"ChatPage", params:{
        id:value5,
        ItemType:value4
      }});
 }
}

const handleChangeValue1 = async () => {
  try {
    if (value1 == null) {
      return
    }
    const response = await api.get(`/list/department/child?ParentDepartmentID=${value1}`);
    console.log(response);
    setItems2(response.data.data);
  } catch (error) {
    console.log(error);
  }
}
const handleChangeValue3 = async () => {
  setItems4([{ label: "التحدث مع قواعد البيانات", value: 2 },
    { label: "التحدث مع الملفات", value: 1 },])
}

const handleChangeValue4 = async () => {
  try {
    if (value1 == null) {
      return
    }
    const response = await api.get(`/list/company/document?DepartmentID=${value3}&ItemType=${value4}`);
    console.log(response.data.data);
    setItems5(response.data.data);
  } catch (error) {
    console.log(error);
  }
}
const handleChangeValue2 = async () => {
  try {
    if (value2 == null) {
      return
    }
    const response = await api.get(`/list/department/child?ParentDepartmentID=${value2}`);
    console.log(response.data.data);
    setItems3(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  const setTheFirstCombo = async () => {
    try {
      const response = await api.get('/list/company/department');
      setItems1(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  setTheFirstCombo();
}, []);

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
          onChangeValue={handleChangeValue2}
        />
      </View>
      <View style={[styles.dropdownContainer, { zIndex: open3 ? 3 : 0 }]}>
        <Text style={styles.label}>التصنيف</Text>
        <DropDownPicker
          open={open3}
          value={value3}
          items={items3}
          setOpen={setOpen3}
          setValue={setValue3}
          setItems={setItems3}
          placeholder="اختر التصنيف"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          onChangeValue={handleChangeValue3}
        />
      </View>

      <View style={[styles.dropdownContainer, { zIndex: open4 ? 2 : 0 }]}>
        <Text style={styles.label}>الموضوع</Text>
        <DropDownPicker
          open={open4}
          value={value4}
          items={items4}
          setOpen={setOpen4}
          setValue={setValue4}
          setItems={setItems4}
          placeholder="اختر الموضوع"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          onChangeValue={handleChangeValue4}
        />
      </View>

      <View style={[styles.dropdownContainer, { zIndex: open5 ? 1 : 0 }]}>
        <Text style={styles.label}>البيان</Text>
        <DropDownPicker
          open={open5}
          value={value5}
          items={items5}
          setOpen={setOpen5}
          setValue={setValue5}
          setItems={setItems5}
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
