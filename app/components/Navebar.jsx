import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../Styles";

const Navbar = ({ onOpenSidebar, showChatIcon = true, onClearChat }) => {
  const navigation = useNavigation();
  const [isOnDropdownPage, setIsOnDropdownPage] = useState(false);

  const handleBackAndLogin = () => {
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    if (currentRoute === "ChatPage") {
      navigation.navigate("DropdownsPage");
    } else if (currentRoute === "DropdownsPage") {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.navbar}>
      {/* Sidebar Button */}
      <TouchableOpacity onPress={onOpenSidebar}>
        <Ionicons name="menu-outline" size={28} color="#2579A7" />
      </TouchableOpacity>

      {/* Right-Aligned Icons */}
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
        {showChatIcon && (
          <TouchableOpacity onPress={onClearChat}>
            <Ionicons name="chatbox-ellipses-outline" size={28} color="#2579A7" style={{ marginRight: 16 }} />
          </TouchableOpacity>
        )}

        {/* Back/Logout Button with Rounded Background */}
        <TouchableOpacity onPress={handleBackAndLogin} style={customStyles.roundedIcon}>
          <Ionicons name="arrow-forward-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  roundedIcon: {
    backgroundColor: "#2579A7", 
    borderRadius: 50, 
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Navbar;
