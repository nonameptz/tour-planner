<template>
  <v-app>
    <v-container>
      <v-btn-toggle v-model="view" class="mb-4">
        <v-btn value="driver">Drivers</v-btn>
        <v-btn value="tour">Tours</v-btn>
      </v-btn-toggle>

      <v-row>
        <v-col cols="12" md="6">
          <list-component
              :items="view === 'driver' ? drivers : tours"
              @select-item="selectItem"
              :view="view"
          />
        </v-col>

        <v-col cols="12" md="6">
          <form-component
              :selected-item="selectedItem[view]"
              :view="view"
              :drivers="drivers"
              @save="saveItem"
              @delete="deleteItem"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ListComponent from './components/ListComponent.vue';
import FormComponent from './components/FormComponent.vue';
import { useDrivers } from '@/composables/useDrivers';
import data from '@/assets/data.json';

export default defineComponent({
  name: 'App',
  components: {
    ListComponent,
    FormComponent
  },
  setup() {
    const view = ref('driver');
    const { addDriver } = useDrivers();
    const selectedItem = ref({
      driver: null,
      tour: null
    });

    const drivers = reactive(data.drivers);
    const tours = reactive(data.tours);

    const selectItem = (item: any) => {
      selectedItem.value[view.value] = item;
    };

    const saveItem = (item: any) => {
      if (selectedItem.value[view.value]) {
        Object.assign(selectedItem.value[view.value], item);
        selectedItem.value[view.value] = null;
      } else {
        if (view.value === 'tour') {
          tours.push({id: tours.length + 1, ...item});
        }
      }
    };

    const deleteItem = () => {
      if (selectedItem.value[view.value]) {
        if (view.value === 'driver') {
          const index = drivers.indexOf(selectedItem.value[view.value]);
          drivers.splice(index, 1);
        } else {
          const index = tours.indexOf(selectedItem.value[view.value]);
          tours.splice(index, 1);
        }
        selectedItem.value[view.value] = null;
      }
    };

    return {
      view,
      drivers,
      tours,
      selectedItem,
      selectItem,
      saveItem,
      deleteItem
    };
  }
});
</script>

<style scoped>
.v-btn-toggle .v-btn {
  margin-right: 10px;
}
</style>
