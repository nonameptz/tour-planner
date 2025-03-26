import { reactive } from 'vue';
import data from '@/assets/data.json';

// Define the type for a Driver
interface Driver {
  id: number;
  name: string;
  location: string;
}

export const useDrivers = () => {
  const drivers = reactive<Driver[]>(data.drivers); // Assuming data.json contains drivers

  const addDriver = (name: string, location: string) => {
    if (location.match(/^[A-Za-z ]+$/)) {
      drivers.push({ id: drivers.length + 1, name, location });
      return true;
    }
    return false
  };


  return { drivers, addDriver };
};
