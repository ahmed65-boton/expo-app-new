import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";

export default function S() {
  console.log("setings loaded");
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button
        onPress={() => {alert("Settings Button Pressed");
          console.log("Settings Button Pressed");
        }
          
        } title="hello">
          <Text>click</Text>
      </Button>
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        color: "blue",
        fontSize: 50,
      },
});