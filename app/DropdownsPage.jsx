
import Navbar from './components/Navebar';
import Sidebar from './components/Sidebar';
import Dropdowns from './components/Dropdowns';
import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

export default function DropdownsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handleOutsidePress = () => {
        if (isSidebarOpen) setIsSidebarOpen(false);
      };
	return (
     <>
           <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <Navbar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          showChatIcon={false}
        />
        {isSidebarOpen && (
          <Sidebar
            isVisible={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
         <Dropdowns/>
      </View>
    </TouchableWithoutFeedback>
       
     </>
	);
}
