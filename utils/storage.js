import { mockData } from '../constants/mock';
import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'FlashCards:decks';

export const createDeck = () => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(mockData));
};

export const getDeck = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
};
