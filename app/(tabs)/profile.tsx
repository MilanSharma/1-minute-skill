import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/app/context';
import { Settings, Wallet, Video, Star } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>@{user.id}</Text>
        <Settings color={Colors.dark.text} size={24} />
      </View>

      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.4k</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.walletSection}>
        <View style={styles.walletHeader}>
           <Wallet color={Colors.dark.secondary} size={20} />
           <Text style={styles.walletTitle}>Wallet Balance</Text>
        </View>
        <Text style={styles.balance}>${user.balance.toFixed(2)}</Text>
        <TouchableOpacity style={styles.topUpButton}>
          <Text style={styles.topUpText}>+ Top Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Video color={Colors.dark.text} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Star color={Colors.dark.textDim} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentGrid}>
         <View style={styles.emptyPlaceholder}>
            <Text style={{color: Colors.dark.textDim}}>No videos yet</Text>
         </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  username: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
  },
  name: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.dark.textDim,
    fontSize: 12,
  },
  editButton: {
    marginTop: 20,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  editButtonText: {
    color: Colors.dark.text,
    fontWeight: '600',
  },
  walletSection: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletTitle: {
    color: Colors.dark.textDim,
  },
  balance: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  topUpButton: {
    backgroundColor: Colors.dark.surfaceHighlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  topUpText: {
    color: Colors.dark.tint,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.text,
  },
  contentGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPlaceholder: {
    padding: 20,
  },
});
