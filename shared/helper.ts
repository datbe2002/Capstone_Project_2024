import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import React from "react";

const getItemsFromAsyncStorage = async (key: string) => {
  try {
    const items = await AsyncStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return [];
  }
};

const addItemsToAsyncStorage = async (item: any, key: string) => {
  try {
    const items = await getItemsFromAsyncStorage(key);
    items.push(item);
    await AsyncStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error adding to ${key}:`, error);
  }
};

const removeItemsFromAsyncStorage = async (id: number | null, key: string) => {
  try {
    const items = await getItemsFromAsyncStorage(key);
    const updated = items.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error(`Error removing from ${key}`, error);
  }
};

const clearAsyncWithKey = async (key: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing" + key, error);
  }
};

const getRoomId = (currentId: string | null | undefined, staffId: string) => {
  const sortedIds = [currentId, staffId].sort();
  const roomId = sortedIds.join('-');
  return roomId;
}

export {
  addItemsToAsyncStorage,
  clearAsyncWithKey,
  getItemsFromAsyncStorage,
  removeItemsFromAsyncStorage,
  getRoomId
};
