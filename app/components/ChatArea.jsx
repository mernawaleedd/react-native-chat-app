import React, { useState, useRef } from "react";
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  Pressable, 
  Animated, 
  Clipboard, 
  Alert 
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Markdown from 'react-native-markdown-display';
import EventSource from 'react-native-event-source';
import * as DocumentPicker from 'expo-document-picker'; // Import document picker
import * as ImagePicker from 'expo-image-picker'; // Import image picker
import styles from "../Styles";

const ChatArea = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();
  const scaleAnim = useRef(new Animated.Value(1)).current; // For scaling animation

  const closeConnection = (eventSource) => {
    eventSource.close();
    console.log("Connection closed.");
    setLoading(false);
  };

  const sendMessage = () => {
    let fullResponse = "";
    if (input == "") {
      return;
    }
    setInput(""); // Clear previous responses
    const botMessageId = Date.now().toString() + 2;
    setLoading(true); // Show loading state
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: input, isUser: true },
        { id: botMessageId, text: "", isUser: false }, // Add placeholder for bot response
      ]);

      const url = `http://192.168.1.244:8000/stream`; // Adjust the URL if necessary

      const eventSource = new EventSource(url, {
        method: "POST", // Ensure you use POST if required
        body: JSON.stringify({
          question: input,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      eventSource.addEventListener("message", ({ data }) => {
        const msgObj = JSON.parse(data);
        console.log(msgObj);
        fullResponse += msgObj;

        // Check if the bot message already exists
        setMessages((prevMessages) => {
          const existingBotMessage = prevMessages.find(
            (message) => message.id === botMessageId
          );

          if (existingBotMessage) {
            // Update the existing bot message
            return prevMessages.map((message) =>
              message.id === botMessageId
                ? { ...message, text: (message.text || "") + msgObj }
                : message
            );
          } else {
            // Add a new bot message if it doesn't exist
            return [
              ...prevMessages,
              { id: botMessageId, text: msgObj, isUser: false },
            ];
          }
        });
        flatListRef.current?.scrollToEnd();
      });

      // Return cleanup function
      eventSource.addEventListener("end", () => {
        console.log("Stream ended.");
        closeConnection(eventSource); // Close the connection when the stream ends
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => {
        const existingBotMessage = prevMessages.find(
          (message) => message.id === botMessageId
        );

        if (existingBotMessage) {
          // Update the existing bot message
          return prevMessages.map((message) =>
            message.id === botMessageId
              ? {
                  ...message,
                  text: (message.text || "") + "An Error Occurred Try again",
                }
              : message
          );
        } else {
          // Add a new bot message if it doesn't exist
          return [
            ...prevMessages,
            { id: botMessageId, text: "An Error Occurred Try again", isUser: false },
          ];
        }
      });
      setLoading(false); // Hide loading state
    }
  };

  const handleTextCopy = (text) => {
    Clipboard.setString(text);
    alert("Text copied to clipboard!");
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log("Camera result:", result);
        // Handle the camera result here (e.g., send image, display it, etc.)
      }
    } else {
      Alert.alert("Permission Denied", "You need to allow camera access.");
    }
  };

  const openDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
      });

      if (result.type === "success") {
        console.log("Document result:", result);
        // Handle document result here (e.g., send document, display it, etc.)
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser
          ? { alignSelf: "flex-end", flexDirection: "row-reverse" }
          : { alignSelf: "flex-start", flexDirection: "row" },
      ]}
    >
      <View style={styles.iconContainer}>
        {item.isUser ? (
          <Ionicons name="person-circle-outline" size={24} color="#2579A7" />
        ) : (
          <MaterialIcons name="smart-toy" size={24} color="#2579A7" />
        )}
      </View>
      <Text
        style={[
          styles.messageText,
          item.isUser && styles.userMessageText,
          !item.isUser && { color: "black" },
        ]}
      >
        <Markdown style={markdownStyles}>{item.text}</Markdown>
      </Text>
      <TouchableOpacity onPress={() => handleTextCopy(item.text)}>
        <Ionicons name="copy" size={20} color="#2579A7" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.chatArea}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWithMic}>
          <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
            <MaterialIcons name="photo-camera" size={24} color="#2579A7" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openDocumentPicker}
            style={styles.iconContainer}
          >
            <MaterialIcons name="attach-file" size={24} color="#2579A7" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          onPress={sendMessage}
          style={({ pressed }) => [
            styles.sendButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Ionicons
            name={input.trim() ? "send" : "mic-outline"}
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatArea;

const markdownStyles = {
  body: {
    fontSize: 16,
    color: "#333",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    color: "#1e90ff",
  },
};
