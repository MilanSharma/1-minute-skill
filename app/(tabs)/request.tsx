import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Colors from '@/constants/colors';
import { CATEGORIES } from '@/constants/mocks';
import { useState } from 'react';
import { useApp } from '@/app/context';
import { useRouter } from 'expo-router';

export default function RequestScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [price, setPrice] = useState('1.00');
  const { requestSkill, user } = useApp();
  const router = useRouter();

  const handleRequest = () => {
    if (!selectedCategory || !prompt) {
      Alert.alert('Missing info', 'Please select a category and describe your request.');
      return;
    }
    const cost = parseFloat(price);
    if (user.balance < cost) {
      Alert.alert('Insufficient funds', 'Please top up your wallet.');
      return;
    }

    requestSkill(selectedCategory, prompt, cost);
    Alert.alert('Success', 'Request sent! Creators will respond shortly.', [
      { text: 'OK', onPress: () => router.push('/(tabs)/inbox' as any) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Request a Skill</Text>
        <Text style={styles.headerSubtitle}>Get a personalized 1-minute video/audio.</Text>

        <Text style={styles.label}>1. Select Category</Text>
        <View style={styles.categories}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[
                styles.catChip, 
                selectedCategory === cat.name && styles.catChipActive
              ]}
              onPress={() => setSelectedCategory(cat.name)}
            >
              <Text style={[
                styles.catText,
                selectedCategory === cat.name && styles.catTextActive
              ]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>2. Describe what you want</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Tell me a joke about programming..."
          placeholderTextColor={Colors.dark.textDim}
          multiline
          numberOfLines={4}
          value={prompt}
          onChangeText={setPrompt}
        />

        <Text style={styles.label}>3. Offer Price ($)</Text>
        <TextInput
          style={styles.priceInput}
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total: ${price}</Text>
          <Text style={styles.balanceText}>Wallet: ${user.balance.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.dark.textDim,
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: 16,
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  catChipActive: {
    backgroundColor: Colors.dark.tint,
    borderColor: Colors.dark.tint,
  },
  catText: {
    color: Colors.dark.text,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#000', // Black text on bright tint
  },
  input: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    color: Colors.dark.text,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  priceInput: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    color: Colors.dark.tint,
    fontSize: 24,
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  balanceText: {
    fontSize: 16,
    color: Colors.dark.textDim,
  },
  button: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.dark.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
