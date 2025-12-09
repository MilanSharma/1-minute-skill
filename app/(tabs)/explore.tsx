import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { CATEGORIES } from '@/constants/mocks';
import { Search as SearchIcon } from 'lucide-react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Skills</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchIcon color={Colors.dark.textDim} size={20} />
        <TextInput 
          placeholder="Search for anything..." 
          placeholderTextColor={Colors.dark.textDim}
          style={styles.searchInput}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.card}>
              <View style={styles.iconPlaceholder}>
                 {/* Icons would go here */}
                 <Text style={styles.emoji}>{cat.icon === 'Smile' ? '😂' : cat.icon === 'Lightbulb' ? '💡' : cat.icon === 'Music' ? '🎵' : '🔥'}</Text>
              </View>
              <Text style={styles.cardText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Trending Creators</Text>
        {/* Placeholder for trending */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.dark.text,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  iconPlaceholder: {
    marginBottom: 8,
  },
  emoji: {
    fontSize: 32,
  },
  cardText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
});
