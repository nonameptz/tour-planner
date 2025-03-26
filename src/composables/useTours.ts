import { reactive } from 'vue';
import data from '@/assets/data.json';


// Define the type for a Tour
interface Tour {
  id: number;
  customerName: string;
  shipmentDate: string;
  locationFrom: string;
  locationTo: string;
  assignedDriver: string;
}

// Define the type for a Driver (re-used from useDrivers)
interface Driver {
  id: number;
  name: string;
  location: string;
}

// Create a reactive object for storing the tours
export const useTours = () => {
  const tours = reactive<Tour[]>(data.tours); // Assuming data.json contains tours

  // Function to create a new tour
  const createTour = (customerName: string, shipmentDate: string, locationFrom: string, locationTo: string, assignedDriver: string): void => {
    tours.push({ id: tours.length + 1, customerName, shipmentDate, locationFrom, locationTo, assignedDriver });
  };

  // Function to get available drivers for a tour based on the location
  const getDriversForTour = (locationFrom: string): Driver[] => {
    return data.drivers.filter((driver: Driver) => driver.location === locationFrom);
  };


  return { tours, createTour, getDriversForTour };
};
