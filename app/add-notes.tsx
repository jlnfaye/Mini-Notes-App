import React, { useState } from "react";

import { addNote } from "@/lib/database";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const categoryOptions = ["Hobby", "Idea", "Daily"];

export default function AddNoteScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Daily");

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Note title is required");
      }

      addNote(title, description, category);
      Alert.alert("Saved", `Note "${title}" added successfully.`);
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter note description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Category</Text>
      <View style={styles.categoryContainer}>
        {categoryOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.categoryButton,
              category === option && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory(option)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                category === option && styles.categoryButtonTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#FAF9F6",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 18,
    color: "#1C1C1C",
    letterSpacing: 0.3,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#2F2F2F",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    color: "#1C1C1C",

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,

    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  categoryButtonActive: {
    backgroundColor: "#2F2F2F",
    borderColor: "#2F2F2F",
  },

  categoryButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2F2F2F",
  },

  categoryButtonTextActive: {
    color: "#FFFFFF",
  },

  button: {
    backgroundColor: "#2F2F2F",
    padding: 15,
    borderRadius: 14,
    marginTop: 10,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});