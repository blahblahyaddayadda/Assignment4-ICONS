import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const items = [
  {
    name: 'Calls',
    icon: 'call',
    color: '#2e18f7',
    iconColor: '#bcfa02',
    message: 'Make calls from Here',
  },
  {
    name: 'Camera',
    icon: 'camera',
    color: '#2e18f7',
    iconColor: '#bcfa02',
    message: 'Welcome to the camera app',
  },
  {
    name: 'Messages',
    icon: 'chatbox',
    color: '#bcfa02',
    iconColor: '#2e18f7',
    message: 'Welcome to your Messages',
  },
  {
    name: 'Music',
    icon: 'musical-note',
    color: '#2e18f7',
    iconColor: '#bcfa02',
    message: 'Welcome to the Music Selection Screen',
  },
  {
    name: 'Photos',
    icon: 'flower',
    color: '#bcfa02',
    iconColor: '#2e18f7',
    message: 'Welcome to the Photos Screen',
  },
];

function AppIcon({ item }) {
  return (
    <View style={[styles.iconBox, { backgroundColor: item.color }]}>
      <Ionicons
        name={item.icon}
        size={64}
        color={item.iconColor || '#FFFFFF'}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.name}`}
            onPress={() => navigation.navigate(item.name)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressed,
            ]}
          >
            <AppIcon item={item} />
            <Text style={styles.label}>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function MessageScreen({ route }) {
  const item = items.find((entry) => entry.name === route.name);

  return (
    <SafeAreaView
      style={styles.messageScreen}
      edges={['left', 'right', 'bottom']}
    >
      <AppIcon item={item} />
      <Text style={styles.message}>{item.message}</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#F2F2F7' },
            contentStyle: { backgroundColor: '#F2F2F7' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          {items.map((item) => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={MessageScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <Pressable
                    onPress={() => navigation.goBack()}
                    accessibilityRole="button"
                    accessibilityLabel="Back to home"
                    hitSlop={10}
                    style={styles.backButton}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color="#007AFF"
                    />
                    <Text style={styles.backText}>Back</Text>
                  </Pressable>
                ),
              })}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  grid: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    minHeight: 168,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.65,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
  },
  messageScreen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
  },
  message: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222222',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  backText: {
    fontSize: 17,
    color: '#007AFF',
  },
});