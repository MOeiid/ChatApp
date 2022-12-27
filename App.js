import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import PersonalInfo from "./components/PersonalInfo";
import Chat from "./components/Chat";
import Styles from "./components/Styles";
// import { AppLoading } from "expo";

const App = () => {
  const storageUserNameKey = "chatapp-username";
  const storageImageKey = "chatapp-image";
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");

  const fetchPersonalData = async () => {};

  const onPersonalInfoClosed = async (name, image) => {
    setUserName(name);
    await AsyncStorage.setItem(storageUserNameKey, name);
    setImage(image);
    await AsyncStorage.setItem(storageImageKey, image);
  };

  // if (isLoading) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchPersonalData}
  //       onFinish={() => setIsLoading(false)}
  //     />
  //   );
  // }

  let activeComponent =
    username != "" ? (
      <Chat username={username} image={image} />
    ) : (
      <PersonalInfo onClosed={onPersonalInfoClosed} />
    );

  return (
    <SafeAreaView style={Styles.container}>
      {activeComponent}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default App;