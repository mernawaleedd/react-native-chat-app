import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { DataTable, TextInput, IconButton } from 'react-native-paper';

const TableData = ({rows}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchBarWidth] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   if (searchQuery.trim() === '') {
  //     setFilteredRows(rows);
  //   } else {
  //     setFilteredRows(
  //       rows.filter((row) =>
  //         Object.values(row).some((value) =>
  //           value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //         )
  //       )
  //     );
  //   }
  // }, [searchQuery]);

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

  const columnNames = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <ScrollView>
            <DataTable style={styles.dataTable}>
              {/* Dynamically generate the header */}
              <DataTable.Header>
                {columnNames.map((column, index) => (
                  <DataTable.Title key={index} style={styles.column}>
                    {column}
                  </DataTable.Title>
                ))}
              </DataTable.Header>

              {/* Dynamically generate the rows */}
              {filteredRows.map((row, rowIndex) => (
                <DataTable.Row key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <DataTable.Cell key={colIndex} style={styles.column}>
                      {value}
                    </DataTable.Cell>
                  ))}
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
