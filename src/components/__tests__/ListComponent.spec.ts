import { mount } from '@vue/test-utils';
import ListComponent from '@/components/ListComponent.vue';

describe('ListComponent', () => {
  let wrapper: any;

  const items = [
    { id: 1, customerName: 'Customer 1', shipmentDate: '2023-12-25', locationFrom: 'Location 1', locationTo: 'Location 2', assignedDriver: 'Driver 1' },
    { id: 2, customerName: 'Customer 2', shipmentDate: '2023-12-25', locationFrom: 'Location 1', locationTo: 'Location 2', assignedDriver: 'Driver 2' }
  ];

  beforeEach(() => {
    wrapper = mount(ListComponent, {
      props: {
        items,
        view: 'driver'
      }
    });
  });

  it('displays "No items available" when items list is empty', async () => {
    await wrapper.setProps({ items: [] });
    expect(wrapper.text()).toContain('No items available');
  });
});
