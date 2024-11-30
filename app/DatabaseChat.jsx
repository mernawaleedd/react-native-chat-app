import Navbar from './components/Navebar';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";

export default function DatabaseChat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to use this feature.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image URI:", result.assets[0].uri);
    }
  };

  const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      console.log("Picked document URI:", result.uri);
    }
  };

  const handleOutsidePress = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <Navbar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onNewChat={clearMessages}
        />
        {isSidebarOpen && (
          <Sidebar
            isVisible={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <ChatArea
          messages={messages}
          setMessages={setMessages}

        />
      </View>
    </TouchableWithoutFeedback>
  );
}
