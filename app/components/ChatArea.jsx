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
import styles from "../Styles";
import { Audio } from 'expo-av';
import {transcripeUrl, streamBaseUrl} from "../../config"

const ChatArea = ({ messages, setMessages, file, setFile, openCamera, openDocumentPicker }) => {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false); // State for loader visibility
  const flatListRef = useRef();
  
  const closeConnection = (eventSource) => {
    eventSource.close();
    console.log("Connection closed.");
    setLoading(false);
  };

  async function transcripeAudio(uri) {
    // Prepare FormData
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'recording.m4a', // Change the name and extension based on your file
      type: 'audio/m4a', // MIME type of the file
    });
  
    try {
      // Upload audio
      const response = await fetch(`${transcripeUrl}/transcribe`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = await response.json();
      setInput(result.transcription)
      console.log('Server response:', result.transcription);
    } catch (error) {
      console.log('Error uploading audio:', error);
    }
  }

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

        const response = await fetch(`${streamBaseUrl}/docs`, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        const result = await response.json();
        context = result.context;
        console.log(result)

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString() + "4", text: `Extracted Text:\n\n ${result.context}`, isUser: false },
          // { id: Date.now().toString() + "5", text: `Translated Text:\n\n ${context}`, isUser: false },
        ]);
        setFile(false); 
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: botMessageId, text: "", isUser: false },
      ]);

      const url = `${streamBaseUrl}/stream`;  
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

  const startRecording = async () => {
    try {
      if (input){
        return
      }
      if (recording) {
        await recording.stopAndUnloadAsync();
        transcripeAudio(recording.getURI());
        console.log(recording, "from start")
        setRecording(null);
        setIsRecording(false);
      }else{
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
        console.log(recordingInstance)
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        transcripeAudio(recording.getURI());
        console.log(recording, "from stop")
        setRecording(null);
        setIsRecording(false);
      }
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  const handleMicPressIn = () => {
    if (!input == ""){
      return
    }
    Animated.spring(scaleAnim, {
      toValue: 1.2, // Scale up the button
      useNativeDriver: true,
    }).start();
  };

  const handleMicPressOut = async () => {
    if (!input == ""){
      return
    }

    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      useNativeDriver: true,
    }).start();

    if (isRecording) {
      await stopRecording();
    }
  };

  const rows = [
    { id: 1, col1: 12251, col2: 11222, col3: 41522, col4: 16255, col5: 11221 },
    {id: 2, col1:1111, col2: 1144, col3:7777, col4: 9999, col5:777888}
  ];

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
            <Datatable rows = {rows}/>
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
          onPressIn={() => {
            if(loading){
              return
            }else{
              handleMicPressIn();
              startRecording();
            }
          }}
          
          onPressOut={handleMicPressOut}
          onPress={sendMessage}
          disabled={loading}
          style={({ pressed }) => [
            styles.sendButton,
            pressed && { opacity: 0.8, scale: 1.5 },
            isRecording && {
              shadowColor: "#ffffff",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 6,
            },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={input.trim() ? "send" : isRecording ? "mic" : "mic-outline"}
              size={20}
              color={input.trim() ? "#fff" : isRecording ? "#C6E7FF" : "#fff"}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
  
};

export default ChatArea;
