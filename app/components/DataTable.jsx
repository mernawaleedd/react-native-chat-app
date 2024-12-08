import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { DataTable, TextInput, IconButton } from 'react-native-paper';

const TableData = ({rows}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchBarWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [searchQuery]);

  const toggleSearch = () => {
    if (!isSearchVisible) {
      setSearchVisible(true); 
      Animated.timing(searchBarWidth, {
        toValue: 300, 
        duration: 300, 
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSearchVisible(false));
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        {isSearchVisible && (
          <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
            <TextInput
              mode="outlined"
              placeholder="Search"
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
              style={styles.searchInput}
              right={
                <TextInput.Icon
                  icon="close"
                  onPress={toggleSearch}
                  iconColor="#2579A7"
                />
              }
            />
          </Animated.View>
        )}
        {!isSearchVisible && (
          <IconButton
            icon="magnify"
            size={24}
            onPress={toggleSearch}
            style={styles.icon}
            iconColor="#2579A7"
          />
        )}
      </View> */}

      {/* Table */}
      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <ScrollView>
            <DataTable style={styles.dataTable}>
              <DataTable.Header>
                <DataTable.Title style={styles.column}>ID</DataTable.Title>
                <DataTable.Title style={styles.column}>Col1</DataTable.Title>
                <DataTable.Title style={styles.column}>Col2</DataTable.Title>
                <DataTable.Title style={styles.column}>Col3</DataTable.Title>
                <DataTable.Title style={styles.column}>Col4</DataTable.Title>
                <DataTable.Title style={styles.column}>Col5</DataTable.Title>
              </DataTable.Header>

              {filteredRows.map((row) => (
                <DataTable.Row key={row.id}>
                  <DataTable.Cell style={styles.column}>{row.id}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{row.col1}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{row.col2}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{row.col3}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{row.col4}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{row.col5}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  searchContainer: {
    overflow: 'hidden',
  },
  searchInput: {
    backgroundColor: '#f9f9f9',
    height: 40,
  },
  icon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dataTable: {
    width: '100%',
  },
  column: {
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default TableData;
