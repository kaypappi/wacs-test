<template>
  <tr class="admin-table-row">
    <td>{{date}}</td>
    <td>{{code}}</td>
    <td>{{title}}</td>
    <td>{{amount_from}} to {{amount_to}}</td>
    <td>{{bank}}</td>
    <td>{{interest}}%</td>
    <td>{{duration}} Months</td>
    <td>
      <span v-if="status === 'Active'" class="status-oval active-status">Active</span>
      <span v-else-if="status ==='InActive'" class="status-oval inactive-status">Inactive</span>
      <span v-else class="status-oval new-status">Draft</span>
    </td>
  </tr>
</template>
<script>
export default {
  components: {},
  props: {
    id: [String, Number],
    date: String,
    code: String,
    title: String,
    amount_from: String,
    amount_to: String,
    interest: Number,
    duration: Number,
    status: String,
    bank: String
  },
  methods: {}
};
</script>
