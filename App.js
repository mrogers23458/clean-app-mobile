import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomeScreen from './src/HomeScreen';
import { gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://clean-app.hasura.app/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'SuperSecretKey' // TODO: Restrict access to GraphQL endpoint https://docs.hasura.io/1.0/graphql/manual/auth/index.html
  },
  cache: new InMemoryCache()
});

async function getData() {
  const GET_ALL_USERS = await client.query({
    query: gql`
    query MyQuery {
      users {
        username
        id
        email
      }
    }
    `
  })

  console.log(GET_ALL_USERS)
}

getData()

const App = () => {

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App

AppRegistry.registerComponent('MyApplication', () => App);