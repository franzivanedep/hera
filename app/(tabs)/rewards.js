import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏛️ Placeholder Page</Text>
      <Text style={styles.subtitle}>This tab is under construction.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf3',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5a4634',
  },
  subtitle: {
    fontSize: 14,
    color: '#9e8a73',
    marginTop: 6,
  },
});
