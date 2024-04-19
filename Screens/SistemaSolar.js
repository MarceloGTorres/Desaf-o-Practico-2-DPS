import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const SistemaSolar = () => {
  const [planetas, setPlanetas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlanetas, setFilteredPlanetas] = useState([]);
  const [selectedPlaneta, setSelectedPlaneta] = useState(null);

  useEffect(() => {
    fetchPlanetas();
  }, []);

  const fetchPlanetas = async () => {
    try {
      const response = await fetch('https://apimocha.com/apixd/planetas');
      const data = await response.json();
      setPlanetas(data.planetas);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  useEffect(() => {
    const filtered = planetas.filter(planeta =>
      planeta.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlanetas(filtered);
  }, [searchQuery, planetas]);

  const handlePlanetaPress = (planeta) => {
    setSelectedPlaneta(planeta);
  };

  const handleReturnButtonPress = () => {
    setSelectedPlaneta(null);
  };

  if (selectedPlaneta) {
    return (
      <View style={styles.container}>
        <View style={styles.planetaInfoContainer}>
          <Image source={{ uri: selectedPlaneta.foto }} style={styles.planetaImagen} />
          <Text style={styles.planetaNombre}>{selectedPlaneta.nombre}</Text>
          <Text>Tipo: {selectedPlaneta.tipo}</Text>
          <Text>Masa: {selectedPlaneta.masa}</Text>
          <Text>Radio: {selectedPlaneta.radio}</Text>
          <Text>Distancia media al Sol: {selectedPlaneta.distancia_media_al_sol}</Text>
          <Text>Periodo orbital: {selectedPlaneta.periodo_orbital}</Text>
          <Text>Periodo de rotación: {selectedPlaneta.periodo_rotacion}</Text>
          <Text>Número de lunas: {selectedPlaneta.numero_de_lunas}</Text>
        </View>
        <TouchableOpacity onPress={handleReturnButtonPress} style={styles.returnButton}>
          <Text style={styles.returnButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar planeta..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPlanetas}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.planetaContainer} onPress={() => handlePlanetaPress(item)}>
            <Image source={{ uri: item.foto }} style={styles.planetaImagen} />
            <Text style={styles.planetaNombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.nombre}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  planetaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  planetaImagen: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  planetaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  returnButton: {
    alignSelf: 'center',
    padding: 10,
  },
  returnButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff', 
  },
  planetaInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default SistemaSolar;

