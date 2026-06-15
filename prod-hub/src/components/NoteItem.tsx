import { View, Text, Pressable, StyleSheet } from "react-native";
import { Note } from "../types/notes";

type Props = {
  note: Note;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>

      <Text style={styles.content}>
        {note.content}
      </Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(note.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  content: {
    marginBottom: 10,
  },

  deleteButton: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  deleteText: {
    color: "white",
  },
});