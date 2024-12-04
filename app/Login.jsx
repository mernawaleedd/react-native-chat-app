import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { useRouter } from "expo-router";
import LoginImage from '../assets/images/LoginImage.png';
import styles from './Styles';


const MedLogin = () => {
  const router=useRouter()
  // Validation Schema with Regex for Email
const validationSchema = Yup.object({
  emailOrUsername: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// Submit Handler
async function handleSubmit(values) { 
  const { emailOrUsername, password } = values;
  const response = {
    url: "http://192.168.1.242:5000/api/auth/signin",
    method: "POST",
    data: { emailOrUsername, password },
  };
  
  try {
    console.log(emailOrUsername, password);
    const req = await axios.request(response);
    console.log("data", req.data);
    router.replace('DropdownsPage');
  } catch (error) {
    console.error("Login failed:", error);
  }
}
  return (
    <View style={styles.Formcontainer}>
      {/* Right Section: Form */}
      <View style={styles.formSection}>
        {/* Login Form */}
        <Formik
          initialValues={{ emailOrUsername: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View style={styles.form}>
              <Text style={styles.formTitle}>Form Login</Text>

              {/* Username Input */}
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="user" size={20} color="#888" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={values.emailOrUsername}
                  onChangeText={handleChange('emailOrUsername')}
                />
              </View>
              {touched.emailOrUsername && errors.emailOrUsername && (
                <Text style={styles.errorText}>*{errors.emailOrUsername}</Text>
              )}

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="lock" size={20} color="#888" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>*{errors.password}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>

      {/* Left Section: Image */}
      <View style={styles.imageSection}>
        <Image source={LoginImage} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

export default MedLogin;
