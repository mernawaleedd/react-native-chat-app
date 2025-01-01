import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import api from "../../api";
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

  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState(null);
  const [items5, setItems5] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submitForm = () => {
    if (!value1 || !value2 || !value3 || !value4) {
      setError("Please Select Item");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.navigate({
          pathname: "ChatPage",
          params: {
            id: value5,
            ItemType: value4,
          },
        });
      }, 2000);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`list/company/department`);
      setItems1(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchSecondDropdown = async (value1) => {
    setValue1(value1);

    if (value1) {
      setLoading(true);
      try {
        const response = await api.get(
          `list/department/child?ParentDepartmentID=${value1}`
        );
        setItems2(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setItems2([]);
    }
  };

  const fetchThirdDropdown = async (value2) => {
    setValue2(value2);

    if (value2) {
      setLoading(true);
      try {
        const response = await api.get(
          `list/department/child?ParentDepartmentID=${value2}`
        );
        setItems3(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setItems3([]);
    }
  };

  const fetchLastDropdown = async (value4) => {
    setValue4(value4);
console.log(value4);

    if (value4) {
      setLoading(true);
      try {
        const response = await api.get(
          `/list/company/document?DepartmentID=${value3}&ItemType=${value4}`
        );
        setItems5(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setItems5([]);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Re-fetch the data for all dropdowns or reset the states
      setValue1(null);
      setValue2(null);
      setValue3(null);
      setValue4(null);
      setValue5(null);
      await fetchData(); // Refresh the first dropdown data
      setItems2([]);
      setItems3([]);
      setItems4([]);
      setItems5([]);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.innerContainer}>
          <View style={[styles.dropdownContainer, { zIndex: open1 ? 5 : 0 }]}>
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
              onChangeValue={fetchSecondDropdown}
            />
          </View>

          <View style={[styles.dropdownContainer, { zIndex: open2 ? 4 : 0 }]}>
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
              onChangeValue={fetchThirdDropdown}
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
              onChangeValue={() =>
                setItems4([
                  { label: "التحدث مع قواعد البيانات", value: 2 },
                  { label: "التحدث مع الملفات", value: 1 },
                ])
              }
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
              onChangeValue={fetchLastDropdown}
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
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    direction: "rtl",
  },
  innerContainer: {
    flex: 1,
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
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Dropdowns;
