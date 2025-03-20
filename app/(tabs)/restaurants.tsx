import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { mockRestaurants } from '@/data/restaurants';

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRestaurants = mockRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search restaurants..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        testID="restaurant-search"
      />
      
      <FlatList
        data={filteredRestaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard} testID={`restaurant-${item.id}`}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantInfo}>{item.cuisine}</Text>
            <Text style={styles.restaurantAddress}>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#888',
  },
});