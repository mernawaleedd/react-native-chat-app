import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles";
import { useRouter } from "expo-router";
const Navbar = ({ onOpenSidebar, showChatIcon = true, onNewChat }) => {
  const [isOnDropdownPage, setIsOnDropdownPage] = useState(false);
  const router = useRouter(); 

  const handleBackAndLogin = () => {
    router.back();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onOpenSidebar}>
        <Ionicons name="menu-outline" size={28} color="#2579A7" />
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
        {showChatIcon && (
          <TouchableOpacity onPress={onNewChat}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={28}
              color="#2579A7"
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
        )}
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
