import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
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

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const submitForm = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("ChatPage");
    }, 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Reset dropdown values and items or add any refresh logic here
      setValue1(null);
      setValue2(null);
      setValue3(null);
      setValue4(null);
      setItems1([]);
      setItems2([]);
      setItems3([]);
      setItems4([]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
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
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.buttonDisabled]}
        onPress={submitForm}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.submitButtonText}>دخول</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
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
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default Dropdowns;
