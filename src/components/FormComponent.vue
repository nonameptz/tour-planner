<template>
  <v-form>
    <v-item-group v-if="view === 'driver'">
      <v-text-field
          v-model="formData.driver.name"
          label="Driver Name"
      />
      <v-text-field
          v-model="formData.driver.location"
          label="Location"
          :error="isLocationError"
      />
    </v-item-group>
    <v-item-group v-if="view === 'tour'">
      <v-text-field
        v-model="formData.tour.customerName"
        label="Customer Name"
      />
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-text-field
            v-model="formData.tour.shipmentDate"
            label="Shipment Date"
            readonly
            v-bind="props"
          />
        </template>
        <v-date-picker
          v-model="shipmentDate"
          :min="today"
          @update:modelValue="formatDate" />
      </v-menu>
      <v-text-field
          v-model="formData.tour.locationFrom"
          label="Location From"
      />
      <v-text-field
          v-model="formData.tour.locationTo"
          label="Location To"
      />
      <v-select
          v-model="formData.tour.assignedDriver"
          :items="drivers.filter(driver => driver.location === formData.tour.locationFrom).map(driver => driver.name)"
          label="Assigned Driver"
      />
    </v-item-group>
    <v-btn @click="save" :disabled="isUpdateButtonDisabled()">{{selectedItem ? 'Update' : 'Add'}}</v-btn>
    <v-btn v-if="selectedItem" @click="deleteItem" class="delete-btn">Delete</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { useDrivers } from '@/composables/useDrivers';

export default defineComponent({
  name: 'FormComponent',
  props: {
    selectedItem: {
      type: Object as PropType<any>,
      required: false
    },
    view: {
      type: String,
      required: true
    },
    drivers: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['save', 'delete'],
  setup(props, { emit }) {
    const { addDriver } = useDrivers();
    const dateMenu = ref(false);
    const isLocationError = ref(false);
    const formattedDate = ref('');
    const shipmentDate = ref(null);
    const today = new Date().toISOString().substr(0, 10);

    const formData = reactive({
      driver: {
        name: '',
        location: '',
      },
      tour: {
        customerName: '',
        shipmentDate: '',
        locationFrom: '',
        locationTo: '',
        assignedDriver: ''
      }
    });

    const formatDate = () => {
      if (shipmentDate.value) {
        const date = new Date(shipmentDate.value);
        formData.tour.shipmentDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
      }
    };

    const initFormData = () => {
      formData.driver.name = '';
      formData.driver.location = '';
      formData.tour.customerName = '';
      formData.tour.shipmentDate = '';
      formData.tour.locationFrom = '';
      formData.tour.locationTo = '';
      formData.tour.assignedDriver = '';
    };

    watch(() => props.selectedItem, (newItem) => {
      if (newItem) {
        formData.driver.name = newItem.name || '';
        formData.driver.location = newItem.location || '';
        formData.tour.customerName = newItem.customerName || '';
        formData.tour.shipmentDate = newItem.shipmentDate || '';
        formData.tour.locationFrom = newItem.locationFrom || '';
        formData.tour.locationTo = newItem.locationTo || '';
        formData.tour.assignedDriver = newItem.assignedDriver || '';
      } else {
        initFormData();
      }
    }, { immediate: true });

    const save = async () => {
      if (props.view === 'driver') {
        if (!addDriver(formData.driver.name, formData.driver.location)) {
          isLocationError.value = true;
          return;
        }
      }
      await emit('save', formData[props.view]);
      initFormData();
    };

    const deleteItem = () => {
      emit('delete');
    };

    const isUpdateButtonDisabled = () => {
      return props.view === 'driver'
          ? !formData.driver.name || !formData.driver.location
          : !formData.tour.customerName || !formData.tour.shipmentDate
          || !formData.tour.locationFrom || !formData.tour.locationTo
          || !formData.tour.assignedDriver;
    };

    return {
      formData,
      dateMenu,
      formattedDate,
      shipmentDate,
      today,
      isLocationError,
      isUpdateButtonDisabled,
      save,
      deleteItem,
      formatDate
    };
  }
});
</script>
<style scoped>
.delete-btn {
  margin-left: 20px;
}
</style>
