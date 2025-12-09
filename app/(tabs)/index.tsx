import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useApp } from '@/app/context';
import Colors from '@/constants/colors';
import { useRef, useState, useCallback } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Play } from 'lucide-react-native';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const VideoItem = ({ item, height, isActive }: { item: any, height: number, isActive: boolean }) => {
  const video = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play by default for "active"
  
  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      video.current?.pauseAsync();
    } else {
      video.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.videoContainer, { height, width: WINDOW_WIDTH }]}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: item.videoUrl,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive && isPlaying}
        onError={(error) => console.log('Video loading error:', error)}
      />
      
      {!isPlaying && (
        <View style={styles.playOverlay}>
          <Play color="rgba(255,255,255,0.7)" size={64} fill="rgba(255,255,255,0.3)" />
        </View>
      )}

      {/* Touchable overlay for play/pause */}
      <TouchableOpacity style={styles.touchOverlay} activeOpacity={1} onPress={togglePlay} />

      {/* Right Sidebar Actions */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionButton}>
          <Heart color="white" size={32} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </View>
        <View style={styles.actionButton}>
          <MessageCircle color="white" size={32} />
          <Text style={styles.actionText}>24</Text>
        </View>
        <View style={styles.actionButton}>
          <Share2 color="white" size={32} />
          <Text style={styles.actionText}>Share</Text>
        </View>
        <View style={styles.actionButton}>
           <MoreHorizontal color="white" size={32} />
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>
        <View style={styles.creatorRow}>
          <Image source={{ uri: item.creator.avatar }} style={styles.avatar} />
          <Text style={styles.creatorName}>{item.creator.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {item.creator.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.categoryTag}>#{item.category} • ${item.price.toFixed(2)}</Text>

        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request similar (${item.price.toFixed(2)})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function FeedScreen() {
  const { feed } = useApp();
  const [feedHeight, setFeedHeight] = useState(WINDOW_HEIGHT);
  
  const [activeindex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View 
      style={styles.container} 
      onLayout={(e) => setFeedHeight(e.nativeEvent.layout.height)}
    >
      <FlatList
        data={feed}
        renderItem={({ item, index }) => (
          <VideoItem 
            item={item} 
            height={feedHeight} 
            isActive={index === activeindex}
          />
        )}
        keyExtractor={item => item.id}
        pagingEnabled
        snapToInterval={feedHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    position: 'relative',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
  actionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 120,
    zIndex: 3,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 80, // Leave space for actions
    zIndex: 3,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
  },
  creatorName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  categoryTag: {
    color: Colors.dark.tint,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  requestButton: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  requestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
