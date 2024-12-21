import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  navbar: {
    height: 60,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2579A7",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: -250,
    width: 250,
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    paddingTop: 60,
    transition: "left 0.3s ease-in-out",
    zIndex: 100,
  },
  sidebarHeader: {
    paddingLeft: 20,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  username: {
    color: "#2579A7",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
   position:"absolute",
   bottom:5,
   left:0,
   right:0,
  },
  logoutButtonText: {
    color: "#2579A7",
    fontSize: 16,
    marginLeft: 10,
    fontWeight:"bold",
  },
  chatArea: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
    backgroundColor:'#fff'
  },
  chatContainer: {
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userMessage: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    color:'#ffffff'
  },
  chatGPTMessage: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  userMessageText: {
    backgroundColor: "#2579A7",
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  inputWithMic: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: 5,
    marginRight:5,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#2579A7",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  
  Formcontainer: {
    flex: 1,
    flexDirection: 'column-reverse', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 16,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  form: {
    backgroundColor: '#f7f9fc',
    borderRadius: 8,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  formTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e3a59',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  iconContainer: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    alignItems:"center",
    color: '#333',
  },
  button: {
    backgroundColor: '#2579A7',
    paddingVertical: 12,
    textAlign: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },
  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  errorText: {
    color: 'red',          
    fontWeight: 'bold',     
    fontSize: 14,        
    marginBottom:10,
    marginTop:-10,
  } ,
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#f0f0f0',
    borderRadius: 8,
  } 
});

export default styles;
