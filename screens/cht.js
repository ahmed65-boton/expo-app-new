// screens/ChatScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";


const CHAT_URL = "http://192.168.1.19:9090/chat";
const CMD_URL = "http://192.168.1.19:9090/commands";

export default function ChatScreen() {
  // CHAT STATES
  const [messages, setMessages] = useState([
    { id: "1", who: "bot", text: "Hey! I'm Rex, your C# mentor 🦖" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // COMMAND LIST STATES
  const [commands, setCommands] = useState([]);
  const [show, setShow] = useState(false);

  // 🔵 FETCH COMMANDS
  async function loadCommands() {
    try {
      const res = await fetch(CMD_URL);
      const data = await res.json();

      setCommands(data.commands || []);
      setShow(true);
    } catch (e) {
      console.log("Commands error:", e);
    }
  }

  // 🔵 SEND MESSAGE
  async function sendMessage() {
    const text = input.trim();
    if (!text || sending) return;

    const myMsg = { id: Date.now().toString(), who: "me", text };
    setMessages((prev) => [...prev, myMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply =
        data.reply ||
        "im a ai chatbot made for c# , i cant help with this, call your dad to fix this issue";

      const botMsg = {
        id: Date.now().toString() + "-bot",
        who: "bot",
        text: reply,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const errMsg = {
        id: Date.now().toString() + "-err",
        who: "bot",
        text:
          "I couldn't reach the server 😢\n" +
          "Make sure Python server.py is running and your IP is correct.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  }

  // RENDER EACH CHAT BUBBLE
  function renderItem({ item }) {
    const isMe = item.who === "me";
    return (
      <View
        style={[
          styles.bubble,
          isMe ? styles.meBubble : styles.botBubble,
        ]}
      >
        <Text style={styles.bubbleText}>{item.text}</Text>
      </View>
    );
  }

  return (
    <>
   
      {/* CHAT UI */}
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#111" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        {/* INPUT BAR */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask Rex about C#…"
            placeholderTextColor="#888"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Button title={sending ? "..." : "Send"} onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>

      {/* COMMAND BUTTON + LIST */}
      <View style={{ backgroundColor: "#111", padding: 10 }}>
        <Button title="Show Commands" onPress={loadCommands} />

        {show && (
          <ScrollView style={styles.box}>
            {commands.map((cmd, i) => (
              <Text key={i} style={styles.item}>
                • {cmd}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
      {show && (
  <TouchableOpacity
    style={styles.overlay}
    activeOpacity={1}
    onPress={() => setShow(false)}  // Tap to close popup
  >
    <View style={styles.box}>
      <Text style={styles.popupTitle}>Rex Commands</Text>

      <ScrollView style={{ maxHeight: 300 }}>
        {commands.map((cmd, i) => (
          <Text key={i} style={styles.item}>• {cmd}</Text>
        ))}
      </ScrollView>
    </View>
  </TouchableOpacity>
)}

    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 12,
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  meBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007acc",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#333",
  },
  bubbleText: {
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#222",
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
  },

  // COMMANDS STYLES
  box: {
    marginTop: 10,
    maxHeight: 250,
    padding: 12,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  item: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
  },
  overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

popupTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 12,
  textAlign: "center",
},

});
