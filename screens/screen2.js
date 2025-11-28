import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function S() {
  console.log("setings loaded");
  return (
    <View style={styles.container}>
      <Text>Placeholder text</Text>
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
      Text: {
        color: "blue",
        fontSize: 50,
      },
});