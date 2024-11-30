import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Login from "./Login"
import ChatPage from "./ChatPage"
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { router, useRouter } from "expo-router";
import DatabaseChat from './DatabaseChat'
import DropdownsPage from "./DropdownsPage";
export default function App() {
  return (
    // <Login/>
    // <DatabaseChat/>
    <DropdownsPage/>
  );
}
