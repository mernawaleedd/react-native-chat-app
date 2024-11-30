import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../Styles";

const Navbar = ({ onOpenSidebar, showChatIcon = true }) => {
  const navigation = useNavigation(); // Access the navigation prop

  return (
    <View style={styles.navbar}>
      {/* Sidebar Button */}
      <TouchableOpacity onPress={onOpenSidebar}>
        <Ionicons name="menu-outline" size={28} color="#2579A7" />
      </TouchableOpacity>

      {/* Right-Aligned Icons */}
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
        {showChatIcon && (
          <TouchableOpacity onPress={() => console.log("New chat started!")}>
            <Ionicons name="chatbox-ellipses-outline" size={28} color="#2579A7" style={{ marginRight: 16 }} />
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-out-outline" size={28} color="#2579A7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
