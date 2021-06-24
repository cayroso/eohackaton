<style>
</style>
<template>
    <b-modal id="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             body-class="p-0"
             scrollable
             size="lg">
        <template v-slot:modal-header>
            <div class="w-100 d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div>
                    <h1 class="h5 m-0">Search Customer</h1>
                </div>
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
        </template>
        <template v-slot:modal-footer>
            <div class="d-flex flex-row justify-content-between">
                <button @click="close" class="btn btn-secondary">
                    Close
                </button>
            </div>
        </template>
        <div>
            <tableList :header="{key:'customerId'}"
                       :items="filter.items"
                       :getRowNumber="$util.noop2"
                       :setSelected="$util.noop2"
                       :isSelected="$util.noop2"
                       @onSelectedRow="onSelectedRow">
                <template #header>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>

                </template>
                <template slot="table" slot-scope="row">
                    <td>{{row.index+1}}</td>
                    <td style="cursor:pointer;text-decoration:underline;color:blue">{{row.item.firstName}} {{row.item.lastName}}</td>
                    <td>{{row.item.phoneNumber}}</td>
                    <td>{{row.item.address}}</td>
                </template>
                <template slot="list" slot-scope="row">
                        <div>
                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-3 col-form-label">Name</label>
                                <div class="col align-self-center">
                                    <span style="cursor:pointer;text-decoration:underline;color:blue">{{row.item.firstName}} {{row.item.lastName}}</span>
                                </div>
                            </div>
                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-3 col-form-label">phoneNumber</label>
                                <div class="col">
                                    <span class="form-control-plaintext">
                                        {{row.item.phoneNumber}}
                                    </span>
                                </div>
                            </div>
                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-3 col-form-label">address</label>
                                <div class="col">
                                    <span class="form-control-plaintext">
                                        {{row.item.address}}
                                    </span>
                                </div>
                            </div>
                        </div>
                </template>
            </tableList>
        </div>

    </b-modal>
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

                    await vm.$util.axios.get(`/api/customers/${query}`)
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
                debugger
                vm.$emit('onSelectCustomer', item);
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
