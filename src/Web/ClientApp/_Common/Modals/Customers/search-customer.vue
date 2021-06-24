<style>
    .pointer {
        cursor: pointer;
    }
</style>
<template>
    <div class="card">
        <div class="card-header p-2">

            <div class="w-100 d-flex flex-sm align-items-center justify-content-between">

                <h1 class="h5 mb-sm-0">Search Customer</h1>
                <div>
                    <div class="ml-1">
                        <div class="input-group">
                            <input v-model="filter.criteria" @keyup.enter="search" type="text" class="form-control">
                            <div class="input-group-append">
                                <button @click="search" class="btn btn-secondary" type="button" id="button-addon2">
                                    <span class="fa fas fa-fw fa-search"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--<div class="d-flex flex-row justify-content-between">
                <button @click="close" class="btn btn-secondary">
                    Close
                </button>
            </div>-->
        </div>
        <div>
            <tableList :header="{key:'customerId'}"
                       :items="filter.items"
                       :getRowNumber="$util.noop2"
                       :setSelected="$util.noop2"
                       :isSelected="$util.noop2"
                       @onSelectedRow="onSelectedRow"
                       table-css="table-sm"
                       tr-css="pointer">
                <template #header>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </template>
                <template slot="table" slot-scope="row">
                    <tr @click="onSelectedRow(row.item)" class="pointer">
                        <td class="text-nowrap">
                            {{row.index+1}}<span v-if="customer.customerId === row.item.customerId" class="fas fa-fw fa-check-circle"></span>
                        </td>
                        <td>{{row.item.firstName}} {{row.item.lastName}}</td>
                        <td>{{row.item.email}}</td>
                        <td>{{row.item.phoneNumber}}</td>
                    </tr>
                </template>
                <template slot="list" slot-scope="row">
                    <div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 label-small-bold">Name</label>
                            <div class="col align-self-center">
                                <span style="cursor:pointer;text-decoration:underline;">{{row.item.firstName}} {{row.item.lastName}}</span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 label-small-bold">Email</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.email}}
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 label-small-bold">Phone</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.phoneNumber}}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </tableList>
        </div>

    </div>
</template>
<script>
    //import pageMixin from '../../../Common/Mixins/pageMixin';
    //import paginatedMixin from '../../../Common/Mixins/paginatedMixin';

    import tableList from '../../../_Core/Components/table-list.vue';

    export default {
        //mixins: [pageMixin, paginatedMixin],
        components: {
            tableList
        },
        data() {
            return {
                busy: false,
                filter: {
                    items: [],
                    criteria: '',
                    pageIndex: 1,
                    pageSize: 100,
                    sortField: '',
                    sortOrder: 1
                },
                customer: {}
            };
        },
        async created() {
            await this.search();
        },
        async mounted() {

        },
        methods: {
            async search() {
                const vm = this;
                const filter = vm.filter;

                if (vm.busy)
                    return;

                const query = [
                    '?c=', encodeURIComponent(filter.criteria),
                    '&p=', filter.pageIndex,
                    '&s=', filter.pageSize,
                    '&sf=', filter.sortField,
                    '&so=', filter.sortOrder
                ].join('');

                try {
                    vm.busy = true;
                    vm.customer = {};
                    vm.$emit('onSelectCustomer', vm.customer);
                    await vm.$util.axios.get(`/api/customers/search/${query}`)
                        .then(resp => {
                            vm.filter = Object.assign(vm.filter, resp.data);
                        });
                } catch (e) {

                } finally {
                    vm.busy = false;
                }

            },
            async open() {
                const vm = this;

                vm.$bvModal.show('modal');
            },

            onSelectedRow(item) {
                const vm = this;
                vm.customer = item;
                vm.$emit('onSelectCustomer', vm.customer);
                vm.$bvModal.hide('modal');
            },

            close() {
                const vm = this;
                vm.$emit('customerSelected', null);
                vm.$bvModal.hide('modal');
            }

        }
    }
</script>
