import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Note } from "../../src/types/notes";
import NoteItem from "../../src/components/NoteItem";

const STORAGE_KEY = "notes";

export default function NotesScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  async function loadNotes() {
    try {
      const storedNotes =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveNotes(notesToSave: Note[]) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notesToSave)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function addNote() {
    if (!title.trim() || !content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title,
      content,
    };

    setNotes(prev => [note, ...prev]);

    setTitle("");
    setContent("");
  }

  function deleteNote(id: string) {
    setNotes(prev =>
      prev.filter(note => note.id !== id)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notes</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.noteInput}
      />

      <Pressable
        style={styles.button}
        onPress={addNote}
      >
        <Text style={styles.buttonText}>
          Add Note
        </Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onDelete={deleteNote}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  noteInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});