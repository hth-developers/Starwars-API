import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../store/slices/peopleSlice';
import styles from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const people = useSelector(state => state.people.people);
  const isLoading = useSelector(state => state.people.isLoading);
  const error = useSelector(state => state.people.error);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  if (people.length === 0 && isLoading) {
    return <Text>Loading...</Text>;
  }

  if (people.length === 0 && error) {
    return <Text>Error: {error}</Text>;
  }

  const handleSearch = text => {
    setSearchText(text);
  };

  const filteredPeople = people.filter(person => {
    return person.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handlePress = person => {
    navigation.navigate('Details', { person });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPeople}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <TextInput
            placeholder="Search for people..."
            onChangeText={handleSearch}
            value={searchText}
            style={styles.searchInput}
          />
        )}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Text style={styles.nameText}>{item.name}</Text>
            </TouchableOpacity>
            <Text>Films:</Text>
            <FlatList
              data={item.films}
              keyExtractor={film => film.title}
              style={styles.filmsContainer}
              renderItem={({ item, index }) => (
                <Text style={styles.filmText}>{`${index + 1}: ${
                  item.title
                }`}</Text>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Home;
