import { reactive } from 'vue';
import data from '@/assets/data.json';

// Define the type for a Driver
interface Driver {
  id: number;
  name: string;
  location: string;
}

// Create a reactive object for storing the drivers
export const useDrivers = () => {
  const drivers = reactive<Driver[]>(data.drivers); // Assuming data.json contains drivers

  // Function to add a driver
  const addDriver = (name: string, location: string): void => {
    if (!location.match(/^[A-Za-z ]+$/)) {
      console.warn("Location must not contain numbers!");
      return;
    }
    drivers.push({ id: drivers.length + 1, name, location });
  };


  return { drivers, addDriver };
};
