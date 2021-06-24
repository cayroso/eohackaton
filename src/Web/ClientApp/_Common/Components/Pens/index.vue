<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Pens
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="d-flex flex-row">
                    <div class="mr-1">
                        <button @click="add" class="btn btn-primary">
                            <span class="fas fa-fw fa-plus"></span>
                        </button>
                    </div>
                    <div class="mr-1">
                        <button @click="filter.visible = !filter.visible" class="btn btn-primary">
                            <span class="fas fa-fw fa-filter"></span>
                        </button>
                    </div>
                    <div class="flex-grow-1">
                        <div class="input-group">
                            <input v-model="filter.query.criteria" @keyup.enter="search(1)" type="text" class="form-control">
                            <div class="input-group-append">
                                <button @click="search(1)" class="btn btn-secondary" type="button" id="button-addon2">
                                    <span class="fa fas fa-fw fa-search"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-collapse v-model="filter.visible">
            <div class="row no-gutters row-cols-2 row-cols-md-4 my-2 px-1 rounded border bg-secondary justify-content-end">

                <div class="form-group mb-2 mx-1">
                    <label>Pen Type</label>
                    <div class="">
                        <b-form-select v-model="filter.query.penType" class="form-control">
                            <b-form-select-option value="0">All</b-form-select-option>
                            <b-form-select-option value="1">Breeding</b-form-select-option>
                            <b-form-select-option value="2">Brooding</b-form-select-option>
                            <b-form-select-option value="3">Hardening</b-form-select-option>
                        </b-form-select>
                    </div>
                </div>

            </div>
        </b-collapse>

        <b-overlay :show="busy">
            <div class="mt-2">
                <table-list :header="header" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="table-sm table-bordered"></table-list>
            </div>
        </b-overlay>

        <m-pagination :filter="filter" :search="search" class="mt-2"></m-pagination>

        <modal-quick-view-bird ref="modalQuickViewBird" :urlView="urlView"></modal-quick-view-bird>
        <!--<modal-add-pen ref="modalAddPen" :urlView="urlView" @saved="saved"></modal-add-pen>-->
    </div>
</template>
<script>    
    import paginated from '../../../_Core/Mixins/paginatedMixin'

    import modalQuickViewBird from '../../Modals/Birds/quick-view.vue';
    export default {
        mixins: [
            paginated
        ],
        components: {
            modalQuickViewBird,//, modalAddPen
        },
        props: {
            uid: { type: String, required: true },
            urlAdd: { type: String, required: true },
            urlView: { type: String, required: true },
        },
        data() {
            return {
                header: {
                    key: 'penId',
                    columns: [
                        { title: 'Name', field: 'name', href: this.createViewLink },
                        { title: 'Type', field: 'penTypeText' },
                        //{ title: 'Load', field: 'count' },
                        //{ title: 'Capacity', field: 'capacity' },
                    ]
                },
                filter: {
                    cacheKey: `${this.uid}/pens/index`,
                    query: {
                        penType: 0
                    }
                }
            };
        },
        computed: {

        },
        async created() {
            const vm = this;

            const filter = vm.filter;

            const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};
            const urlParams = new URLSearchParams(window.location.search);

            filter.query.penType = urlParams.get('pt') || cache.penType || filter.query.penType;

            vm.initializeFilter(cache);

            await vm.search();
        },
        async mounted() {

        },
        methods: {
            async  saved(id, flag) {
                const vm = this;

                vm.$refs.modalAddPen.close();
                vm.$bvToast.toast('Pen created.', { title: 'Add Pen', variant: 'success', toaster: 'b-toaster-bottom-right' });

                if (flag) {
                    vm.view(id);
                }
                else {
                    await vm.search();
                }
            },
            async _search() {
                const vm = this;
                const filter = vm.filter;

                if (vm.busy)
                    return;

                const query = [
                    '?pt=', filter.query.penType,
                    '&c=', encodeURIComponent(filter.query.criteria),
                    '&p=', filter.query.pageIndex,
                    '&s=', filter.query.pageSize,
                    '&sf=', filter.query.sortField,
                    '&so=', filter.query.sortOrder
                ].join('');

                vm.busy = true;
                await vm.search_internal(`api/pens`, query, 'Pens',
                    () => {
                        localStorage.setItem(vm.filter.cacheKey, JSON.stringify({
                            penType: filter.query.penType,
                            criteria: filter.query.criteria,
                            pageIndex: filter.query.pageIndex,
                            pageSize: filter.query.pageSize,
                            sortField: filter.query.sortField,
                            sortOrder: filter.query.sortOrder,
                            visible: filter.visible
                        }));

                    }, () => {
                        localStorage.removeItem(vm.filter.cacheKey);
                    }, () => {
                        vm.busy = false;
                    });
            },
            add() {
                const vm = this;
                vm.$util.href(vm.urlAdd);
                //vm.$refs.modalAddPen.open();
            },

            view(id) {
                const vm = this;
                const url = vm.createViewLink(id);

                vm.$util.href(url);
            },

            createViewLink(id) {
                const vm = this;
                const url = `${vm.urlView}${id}`;
                return url;
            },
        }
    }
</script>