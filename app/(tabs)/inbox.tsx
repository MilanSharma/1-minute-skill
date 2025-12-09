import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/app/context';

export default function InboxScreen() {
  const { myRequests } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
      </View>
      
      {myRequests.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No requests yet.</Text>
          <Text style={styles.emptySubtext}>Start by requesting a 1-minute skill!</Text>
        </View>
      ) : (
        <FlatList
          data={myRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
               <View style={styles.itemContent}>
                 <Text style={styles.itemTitle}>Request: {item.category}</Text>
                 <Text style={styles.itemPrompt}>{item.prompt}</Text>
                 <Text style={styles.itemStatus}>{item.status}</Text>
               </View>
               <Text style={styles.itemPrice}>-${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: Colors.dark.textDim,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrompt: {
    color: Colors.dark.textDim,
    marginTop: 4,
  },
  itemStatus: {
    color: Colors.dark.secondary,
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  itemPrice: {
    color: Colors.dark.tint,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
