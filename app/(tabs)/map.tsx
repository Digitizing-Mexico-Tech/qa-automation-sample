import { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import * as Location from 'expo-location';
import { mockRestaurants } from '@/data/restaurants';

const WebMap = () => {
  useEffect(() => {
    // Import Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  
  return (
    <View style={styles.container}>
      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <MapContainer
        center={[19.4326, -99.1332]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mockRestaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
          >
            <Popup>
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine}</p>
                <p>{restaurant.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default function MapScreen() {
  if (Platform.OS === 'web') {
    return <WebMap />;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map view is only available on web platform</Text>
    </View>
  );
}