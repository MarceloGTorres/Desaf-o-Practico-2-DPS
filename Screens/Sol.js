import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Sol = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/312px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg' }}
        style={styles.image}
      />
      <Text style={styles.heading}>Información sobre el Sol</Text>
      <Text>Masa: 1.989 × 10^30 kg</Text>
      <Text>Radio: 695,700 km</Text>
      <Text>Distancia media a la Tierra: 149,600,000 km</Text>
      <Text>Periodo orbital de la Tierra alrededor del Sol: 365.25 días</Text>
      <Text>Periodo de rotación: 25.38 días (en el ecuador)</Text>
      <Text>Número de lunas: 0</Text>
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

export default Sol;
