import { useTours } from '@/composables/useTours';
import { reactive } from 'vue';

jest.mock('@/assets/data.json', () => ({
  tours: [
    { id: 1, customerName: 'Customer 1', shipmentDate: '2023-12-25', locationFrom: 'Location 1', locationTo: 'Location 2', assignedDriver: 'Driver 1' },
    { id: 2, customerName: 'Customer 2', shipmentDate: '2023-12-26', locationFrom: 'Location 2', locationTo: 'Location 3', assignedDriver: 'Driver 2' }
  ],
  drivers: [
    { id: 1, name: 'Driver 1', location: 'Location 1' },
    { id: 2, name: 'Driver 2', location: 'Location 2' }
  ]
}));

describe('useTours', () => {
  it('initializes tours correctly', () => {
    const { tours } = useTours();
    expect(tours).toEqual([
      { id: 1, customerName: 'Customer 1', shipmentDate: '2023-12-25', locationFrom: 'Location 1', locationTo: 'Location 2', assignedDriver: 'Driver 1' },
      { id: 2, customerName: 'Customer 2', shipmentDate: '2023-12-26', locationFrom: 'Location 2', locationTo: 'Location 3', assignedDriver: 'Driver 2' }
    ]);
  });

  it('creates a tour correctly', () => {
    const { tours, createTour } = useTours();
    createTour('Customer 3', '2023-12-27', 'Location 3', 'Location 4', 'Driver 3');
    expect(tours).toContainEqual({ id: 3, customerName: 'Customer 3', shipmentDate: '2023-12-27', locationFrom: 'Location 3', locationTo: 'Location 4', assignedDriver: 'Driver 3' });
  });

  it('gets drivers for a tour based on location', () => {
    const { getDriversForTour } = useTours();
    const drivers = getDriversForTour('Location 1');
    expect(drivers).toEqual([{ id: 1, name: 'Driver 1', location: 'Location 1' }]);
  });
});
