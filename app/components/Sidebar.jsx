import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import styles from "../Styles";

const Sidebar = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); 

  // Function to handle logout
  const handleLogout = () => {
    onClose();
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.sidebar, { left: isVisible ? 0 : -250 }]}>
      <View style={styles.sidebarHeader}>
        <View style={styles.usernameContainer}>
          <Ionicons name="person-circle-outline" size={40} color="#2579A7" />
          <Text style={styles.username}>Merna Waleed</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#2579A7" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;