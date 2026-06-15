import { View, Text, Pressable, StyleSheet } from "react-native";
import { Note } from "../types/notes";

type Props = {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
};

export default function NoteItem({ note, onDelete,onEdit }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>

      <Text style={styles.content}>
        {note.content}
      </Text>

    <Pressable
  style={styles.editButton}
  onPress={() => onEdit(note)}
>
  <Text style={styles.editText}>Edit</Text>
</Pressable>


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
  editButton: {
  alignSelf: "flex-end",
  backgroundColor: "orange",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  marginBottom: 8,
},

editText: {
  color: "white",
},
});