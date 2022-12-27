import React, { useState, useEffect } from "react";
import {FlatList, TextInput, View, Button, ListRenderItem,} from "react-native";
import Styles from "./Styles";
import ChatItem from "./ChatItem";
import Socket from "./Socket";


const Chat = ({ username, image }) => {
  let [chatInput, setChatInput] = useState("");
  let [chatItemList, setChatItemList] = useState<ChatItem['']>([]);

  useEffect(() => {
    (async () => {
      try {
        if (Socket.state == "Disconnected") {
          await Socket.start();
        }
      } catch (err) {
        console.log(err);
      }
    })();
    Socket.on("ReceiveMessage", (chatItem) => {
      setChatItemList((chatItemList) => {
        if (chatItemList.find((i) => i.id == chatItem.id)) return chatItemList;
        return [...chatItemList, chatItem];
      });
    });
  }, []);

  const renderItem = ({ item }) => (
    <ChatItem chatItem={item} username={username}></ChatItem>
  );

  return (
    <View style={Styles.container}>
      <FlatList
        inverted
        data={chatItemList.sort((a, b) => b.timeStamp - a.timeStamp)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>

      <View style={Styles.sendSection}>
        <TextInput
          style={Styles.chatTextInput}
          value={chatInput}
          onChangeText={(text) => setChatInput(text)}
        ></TextInput>
        <Button
          title="Send"
          onPress={async () => {
            await Socket.invoke("SendMessage", {
              id: Math.random().toString(36).substring(7),
              text: chatInput,
              image: image,
              timeStamp: Date.now(),
              by: username,
            });
            setChatInput("");
          }}
        ></Button>
      </View>
    </View>
  );
};

export default Chat;