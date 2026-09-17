import { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#E8DCE8", // light prairie grass background
  moss: "#2F3E2F", // MOSS - dark green
  prairie: "#B89CA8", // PRAIRIE GRASS - dusty mauve
  prairieLight: "#D8C5D0", // lighter version for cards
  white: "#FFFFFF",
  gray: "#F1F1F1"
}

const initialStudents = [
  { id: "1", name: "Juan Dela Cruz", status: null },
  { id: "2", name: "Maria Santos", status: null },
  { id: "3", name: "Pedro Reyes", status: null },
  { id: "4", name: "Ana Lim", status: null },
  { id: "5", name: "Carlos Garcia", status: null },
  { id: "6", name: "Sofia Reyes", status: null },
  { id: "7", name: "Mark Dela Rosa", status: null },
  { id: "8", name: "Liza Cruz", status: null },
  { id: "9", name: "Jose Rizal", status: null },
  { id: "10", name: "Andrea Torres", status: null },
  { id: "11", name: "Miguel Bautista", status: null },
  { id: "12", name: "Patricia Mendoza", status: null },
  { id: "13", name: "Daniel Ramos", status: null },
  { id: "14", name: "Grace Villanueva", status: null },
  { id: "15", name: "Ryan Castillo", status: null },
  { id: "16", name: "Nicole Fernandez", status: null },
  { id: "17", name: "Kevin Morales", status: null },
  { id: "18", name: "Angela Diaz", status: null },
  { id: "19", name: "Stephen Navarro", status: null },
  { id: "20", name: "Chloe Aquino", status: null },
  { id: "21", name: "Ethan Guzman", status: null },
  { id: "22", name: "Isabella Ortega", status: null },
  { id: "23", name: "Jacob Santiago", status: null },
  { id: "24", name: "Zoe Valdez", status: null },
  { id: "25", name: "Nathan Cortez", status: null },
];

export default function Lab08() {
  const [students, setStudents] = useState(initialStudents);
  const [totals, setTotals] = useState({ present: 0, absent: 0 });

  useEffect(() => {
    const present = students.filter(s => s.status === "present").length;
    const absent = students.filter(s => s.status === "absent").length;
    setTotals({ present, absent });
  }, [students]);

  const markAttendance = (id, status) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id? {...student, status } : student
      )
    );
  };

  const resetAttendance = () => {
    setStudents(initialStudents.map(s => ({...s, status: null})));
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => markAttendance(item.id, "present")}
          style={[
            styles.btn,
            { backgroundColor: item.status === "present"? COLORS.moss : COLORS.gray }
          ]}
        >
          <Text style={[styles.btnText, { color: item.status === "present"? COLORS.white : COLORS.moss }]}>
            Present
          </Text>
        </Pressable>
        <Pressable
          onPress={() => markAttendance(item.id, "absent")}
          style={[
            styles.btn,
            { backgroundColor: item.status === "absent"? COLORS.prairie : COLORS.gray }
          ]}
        >
          <Text style={[styles.btnText, { color: item.status === "absent"? COLORS.white : COLORS.moss }]}>
            Absent
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Attendance List</Text>

      <View style={styles.totalBox}>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Present</Text>
          <Text style={[styles.totalCount, { color: COLORS.moss }]}>{totals.present}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Absent</Text>
          <Text style={[styles.totalCount, { color: COLORS.prairie }]}>{totals.absent}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalCount}>{students.length}</Text>
        </View>
      </View>

      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={true}
      />

      <Pressable style={styles.resetBtn} onPress={resetAttendance}>
        <Text style={styles.resetText}>Reset All</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: COLORS.moss
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: COLORS.prairieLight,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3
  },
  totalItem: {
    alignItems: "center"
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.moss
  },
  totalCount: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
    color: COLORS.moss
  },
  studentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    backgroundColor: COLORS.prairieLight,
    borderRadius: 10,
    elevation: 2
  },
  name: {
    fontSize: 16,
    flex: 1,
    fontWeight: "500",
    color: COLORS.moss
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  btnText: {
    fontWeight: "600",
    fontSize: 14
  },
  resetBtn: {
    backgroundColor: COLORS.moss,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  resetText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold"
  }
});
