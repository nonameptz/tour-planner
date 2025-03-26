<template>
  <v-list>
    <v-list-item-group v-if="items.length">
      <v-list-item
          v-for="item in items"
          :key="item.id"
          @click="selectItem(item)"
          :class="{ 'v-list-item--active': selectedItem[view] && item.id === selectedItem[view].id }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name || item.customerName }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.location || item.locationFrom + ' to ' + item.locationTo }}
            <template v-if="view === 'tour'">
              / Shipment Date: {{ item.shipmentDate }}
              / Driver: {{ item.assignedDriver }}
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <v-list-item v-else>No items available</v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'ListComponent',
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    },
    view: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedItem = ref({driver: null, tour: null});
    const selectItem = (item: any) => {
      if (selectedItem.value[props.view] && selectedItem.value[props.view].id === item.id) {
        selectedItem.value[props.view] = null;
        emit('select-item', null);
        return;
      }
      selectedItem.value[props.view] = item;
      emit('select-item', item);
    };

    return {
      selectedItem,
      selectItem
    };
  },
  emits: ['select-item']
});
</script>
