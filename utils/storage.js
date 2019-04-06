import { AsyncStorage } from 'react-native';
import { format } from './format';

export const DECKS_STORAGE_KEY = 'FlashCards:decks';

export const createDeck = deck => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
};

export function getDeck() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(format);
}

export function removeDeck() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(() => {
    const data = {};
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
