import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Notes App</Text>
      <Text style={styles.subtitle}>Welcome User!</Text>

      <Pressable style={styles.button} onPress={() => router.push("/notes")}>
        <Text style={styles.buttonText}>Open Notes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1C1C1C",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
    color: "#6B6B6B",
  },
  button: {
    backgroundColor: "#2F2F2F",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
