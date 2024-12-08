import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
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

        {/* Logout Button */}
        <TouchableOpacity onPress={handleBackAndLogin}>
          <Ionicons name="log-out-outline" size={28} color="#2579A7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
