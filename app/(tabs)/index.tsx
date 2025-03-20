import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Star } from 'lucide-react-native';
import { mockRestaurants } from '@/data/restaurants';

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRestaurants = mockRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mexico City's Finest</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="restaurant-search"
          placeholderTextColor="#666"
        />
      </View>
      
      <FlatList
        data={filteredRestaurants}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.restaurantCard} testID={`restaurant-${item.id}`}>
            <Image
              source={{ uri: item.image }}
              style={styles.restaurantImage}
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.tagsContainer}>
                <Text style={styles.cuisineTag}>{item.cuisine}</Text>
                <Text style={styles.priceTag}>{item.priceRange}</Text>
              </View>
              <Text style={styles.restaurantAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  searchInput: {
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  listContent: {
    padding: 16,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cuisineTag: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  priceTag: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#e8f2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});