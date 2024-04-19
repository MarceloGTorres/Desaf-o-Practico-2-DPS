import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Tierra = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/As08-16-2593.jpg' }}
        style={styles.image}
      />
      <Text style={styles.heading}>Información sobre la Tierra</Text>
      <Text>Masa: 5.972 × 10^24 kg</Text>
      <Text>Radio: 6,371 km</Text>
      <Text>Distancia media al Sol: 149,600,000 km</Text>
      <Text>Periodo orbital: 365.25 días</Text>
      <Text>Periodo de rotación: 1 día</Text>
      <Text>Número de lunas: 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Tierra;
