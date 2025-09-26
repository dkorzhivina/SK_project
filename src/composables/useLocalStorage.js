import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue, options = {}) {
  const { serializer = { read: JSON.parse, write: JSON.stringify } } = options;
  
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue !== null 
    ? serializer.read(storedValue) 
    : defaultValue;
  
  const state = ref(initialValue);
  
  const setValue = (value) => {
    try {
      state.value = value;
      localStorage.setItem(key, serializer.write(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  };
  
  watch(
    state,
    (newValue) => {
      try {
        localStorage.setItem(key, serializer.write(newValue));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    },
    { deep: true }
  );
  
  return [state, setValue];
}