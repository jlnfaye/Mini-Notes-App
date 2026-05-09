import { deleteNote, getNotes, Note } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = () => {
    try {
      const data = getNotes();
      setNotes(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load notes");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const handleDelete = (id: number) => {
Alert.alert(
  "Delete Task",
  "Are you sure you want to delete this task?",
  [
  {
    text: "Cancel",
    style: "cancel"
  },
  {
    text: "Delete",
    style: "destructive",
    onPress: () => {
      try {
        deleteNote(id);
        loadNotes();
      } catch (error) {
        Alert.alert("Delete Error", "Failed to delete note");
      }
    },
  },
  ]
)
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Notes</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/notes/add-notes")}
      >
        <Text style={styles.addButtonText}>Add Notes</Text>
      </Pressable>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No Notes yet.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteDescription}>{item.description}</Text>
              <Text style={styles.noteCategory}>{item.category}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/notes/notes-detail",
                      params: {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        category: item.category,
                      },
                    })
                  }
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF9F6",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 14,
    color: "#1C1C1C",
    letterSpacing: 0.3,
  },

  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2F2F2F",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#EAEAEA",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1C1C1C",
  },

  noteDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 20,
  },

  noteCategory: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "700",
    color: "#2F2F2F",

    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,

    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  detailButton: {
    flex: 1,
    backgroundColor: "#2F2F2F",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  detailButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#d14f4d",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  emptyText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
});