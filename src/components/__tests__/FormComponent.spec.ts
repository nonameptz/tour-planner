import { mount } from '@vue/test-utils';
import FormComponent from '@/components/FormComponent.vue';

describe('FormComponent', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(FormComponent, {
      props: {
        view: 'tour',
        drivers: [
          { name: 'Driver 1', location: 'Location 1' },
          { name: 'Driver 2', location: 'Location 2' }
        ]
      }
    });
  });

  it('initializes formData correctly', () => {
    expect(wrapper.vm.formData.driver.name).toBe('');
    expect(wrapper.vm.formData.driver.location).toBe('');
    expect(wrapper.vm.formData.tour.customerName).toBe('');
    expect(wrapper.vm.formData.tour.shipmentDate).toBe('');
    expect(wrapper.vm.formData.tour.locationFrom).toBe('');
    expect(wrapper.vm.formData.tour.locationTo).toBe('');
    expect(wrapper.vm.formData.tour.assignedDriver).toBe('');
  });

  it('formats date correctly', () => {
    wrapper.vm.shipmentDate = new Date('2023-12-25')
    wrapper.vm.formatDate();
    expect(wrapper.vm.formData.tour.shipmentDate).toBe('25.12.2023');
  });

  it('disables update button when form is incomplete', async () => {
    await wrapper.setProps({ view: 'driver' });
    expect(wrapper.vm.isUpdateButtonDisabled()).toBe(true);

    wrapper.vm.formData.driver.name = 'John Doe';
    wrapper.vm.formData.driver.location = 'New York';
    expect(wrapper.vm.isUpdateButtonDisabled()).toBe(false);
  });

  it('emits delete event', async () => {
    await wrapper.vm.deleteItem();
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
