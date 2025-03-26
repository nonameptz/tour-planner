import { useDrivers } from '@/composables/useDrivers';
import { reactive } from 'vue';

jest.mock('@/assets/data.json', () => ({
  drivers: [
    { id: 1, name: 'Driver 1', location: 'Location 1' },
    { id: 2, name: 'Driver 2', location: 'Location 2' }
  ]
}));

describe('useDrivers', () => {
  it('initializes drivers correctly', () => {
    const { drivers } = useDrivers();
    expect(drivers).toEqual([
      { id: 1, name: 'Driver 1', location: 'Location 1' },
      { id: 2, name: 'Driver 2', location: 'Location 2' }
    ]);
  });

  it('adds a driver correctly', () => {
    const { drivers, addDriver } = useDrivers();
    addDriver('Driver 3', 'Location');
    expect(drivers).toContainEqual({ id: 3, name: 'Driver 3', location: 'Location' });
  });

  it('does not add a driver with invalid location', () => {
    const { drivers, addDriver } = useDrivers();
    addDriver('Driver 4', 'Location 4 with numbers 123');
    expect(drivers).not.toContainEqual({ id: 4, name: 'Driver 4', location: 'Location 4 with numbers 123' });
  });
});
