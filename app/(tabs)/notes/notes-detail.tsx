import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NoteDetailScreen() {
  const { id, title, description, category } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes Detail</Text>
      <Text style={styles.label}>ID: {id}</Text>
      <Text style={styles.label}>Title: {title}</Text>
      <Text style={styles.label}>Description: {description}</Text>
      <Text style={styles.label}>Category: {category}</Text>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/notes/edit-notes",
            params: { id, title, description, category },
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#1C1C1C",
    marginBottom: 20,
    letterSpacing: 0.4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  label: {
    fontSize: 17,
    color: "#2F2F2F",
    marginBottom: 14,
    lineHeight: 26,
    fontWeight: "500",
  },

  category: {
    alignSelf: "flex-start",
    backgroundColor: "#2F2F2F",

    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,

    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 14,
},

  editButton: {
    marginTop: 24,
    backgroundColor: "#2F2F2F",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
},

  editButtonText: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "700",
  },
});