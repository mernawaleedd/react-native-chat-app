import React, { useState, useRef } from "react";
import Datatable from "./DataTable";
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  Pressable, 
  Animated, 
  Clipboard, 
  Alert,
  ActivityIndicator 
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Markdown from 'react-native-markdown-display';
import EventSource from 'react-native-event-source';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'; 
import styles from "../Styles";
import { Audio } from 'expo-av';
const ChatArea = ({ messages, setMessages, file, setFile, openCamera, openDocumentPicker }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const [audioUri, setAudioUri] = useState("");
  
  const closeConnection = (eventSource) => {
    eventSource.close();
    console.log("Connection closed.");
    setLoading(false);
  };

  const sendMessage = async () => {
    if (input === "") return;
    const userMessage = { id: Date.now().toString(), text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); 
    setLoading(true);

    const botMessageId = Date.now().toString() + "2"; 
    let fullResponse = "";

    try {
      let context = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
        });

        const response = await fetch("http://192.168.1.242:8000/docs", {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        const result = await response.json();
        context = result.english_translation;

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString() + "4", text: `Extracted Text:\n\n ${result.context}`, isUser: false },
          { id: Date.now().toString() + "5", text: `Translated Text:\n\n ${context}`, isUser: false },
        ]);
        setFile(false); 
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: botMessageId, text: "Loading...", isUser: false },
      ]);

      const url = `http://192.168.1.242:8000/stream`;  
      const eventSource = new EventSource(url, {
        method: 'POST',
        body: JSON.stringify({
          question: input,
          context: context,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      eventSource.addEventListener("message", ({ data }) => {
        const msgObj = JSON.parse(data);
        fullResponse += msgObj;

        setMessages((prevMessages) => {
          const existingBotMessage = prevMessages.find((message) => message.id === botMessageId);

          if (existingBotMessage) {
            return prevMessages.map((message) =>
              message.id === botMessageId
                ? { ...message, text: (message.text || "") + msgObj }
                : message
            );
          } else {
            return [
              ...prevMessages,
              { id: botMessageId, text: msgObj, isUser: false },
            ];
          }
        });

        flatListRef.current?.scrollToEnd();
      });

      eventSource.addEventListener('end', () => {
        console.log('Stream ended.');
        closeConnection(eventSource); 
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString() + "3", text: "db role message", role: "db", isUser: false },
        ]);
      });

    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => {
        const existingBotMessage = prevMessages.find((message) => message.id === botMessageId);
        return existingBotMessage
          ? prevMessages.map((message) =>
              message.id === botMessageId
                ? { ...message, text: (message.text || "") + "An Error Occurred. Try again." }
                : message
            )
          : [
              ...prevMessages,
              { id: botMessageId, text: "An Error Occurred. Try again.", isUser: false },
            ];
      });
      setLoading(false);
    }
  };

  const handleTextCopy = (text) => {
    Clipboard.setString(text);
    alert("Text copied to clipboard!");
  };

  const renderMessage = ({ item }) => {
    return (
      <View>
        {item.isUser ? (
          <View
            style={[styles.messageContainer, { alignSelf: "flex-end", flexDirection: "row-reverse"}]}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle-outline" size={24} color="#2579A7" />
            </View>
            <Text
              style={[styles.messageText, { color: "#333" }]}
            >
              <Markdown style={{ body: { fontSize: 16, color: "#333" } }}>
                {item.text}
              </Markdown>
            </Text>
            <TouchableOpacity onPress={() => handleTextCopy(item.text)}>
              <Ionicons name="copy" size={20} color="#2579A7" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        ) : item.text === "Loading..." ? (
          <View style={[styles.messageContainer, { alignSelf: "flex-start", flexDirection: "row" }]}>
            <MaterialIcons name="smart-toy" size={24} color="#2579A7" />
            <ActivityIndicator size="small" color="#2579A7" />
          </View>
        ) : item.role === "db" ? (
          <View>
            <Datatable />
          </View>
        ) : item.role === "doc" ? (
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={24} color="#2579A7" />
          </View>
        ) : (
          <View
            style={[styles.messageContainer, { alignSelf: "flex-start", flexDirection: "row" }]}>
            <MaterialIcons name="smart-toy" size={24} color="#2579A7" />
            <Text style={[styles.messageText, { color: "#333" }]}>
              <Markdown style={{ body: { fontSize: 16, color: "#333" } }}>
                {item.text}
              </Markdown>
            </Text>
            <TouchableOpacity onPress={() => handleTextCopy(item.text)}>
              <Ionicons name="copy" size={20} color="#2579A7" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }
  
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recordingInstance.startAsync();
  
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setAudioUri(recording.getURI());
        setRecording(null);
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };
  
  return (
    <View style={styles.chatArea}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
  
      {/* Removed the separate loader */}
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWithMic}>
          <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
            <MaterialIcons name="photo-camera" size={24} color="#2579A7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openDocumentPicker} style={styles.iconContainer}>
            <MaterialIcons name="attach-file" size={24} color="#2579A7" />
          </TouchableOpacity>
  
          <TextInput
            style={[
              styles.input,
              { textAlignVertical: "center", paddingVertical: 8 } // Center the text and placeholder
            ]}
            placeholder="Type a message..."
            placeholderTextColor="#aaa" // Adjust color if necessary
            value={input}
            onChangeText={setInput}
            multiline={true}
            numberOfLines={4}
          />
        </View>
  
        <Pressable
          onLongPress={startRecording}
          onPressOut={stopRecording}  
          onPress={input.trim() ? sendMessage : null} 
          style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.8 }]}
        >
          <Ionicons
            name={isRecording ? "stop-circle" : (input.trim() ? "send" : "mic-outline")}
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>
    </View>
  );
  
};

export default ChatArea;
