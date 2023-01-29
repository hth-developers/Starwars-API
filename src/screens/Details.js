import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';

const Details = ({ route }) => {
  const { person } = route.params;

  return (
    <View>
      <Text style={styles.nameText}>Name: {person.name}</Text>
      <Text>Films:</Text>
      <FlatList
        data={person.films}
        keyExtractor={film => film.title}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Text style={styles.filmText}>{`${index + 1}: ${item.title}`}</Text>
            <Text style={styles.director}>Director: {item.director}</Text>
            <Text style={styles.openingCrawl}>
              Opening Crawl: {item.opening_crawl}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Details;
