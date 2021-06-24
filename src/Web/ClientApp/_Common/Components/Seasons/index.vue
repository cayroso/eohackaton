<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Seasons
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="d-flex flex-row">
                    <div class="mr-1">
                        <button @click="add" class="btn btn-primary">
                            <span class="fas fa-fw fa-plus"></span>
                        </button>
                    </div>
                    <div class="input-group">
                        <input v-model="filter.query.criteria" @keyup.enter="search(1)" type="text" class="form-control" placeholder="Enter criteria..." aria-label="Enter criteria..." aria-describedby="button-addon2">
                        <div class="input-group-append">
                            <button @click="search(1)" class="btn btn-primary" type="button" id="button-addon2">
                                <span class="fa fas fa-fw fa-search"></span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <b-overlay :show="busy">
            <div class="mt-2">
                <table-list :header="header" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="table-sm table-bordered"></table-list>
            </div>
        </b-overlay>


        <m-pagination :filter="filter" :search="search" class="mt-2"></m-pagination>

        <modalAddSeason ref="modalAddSeason" @saved="seasonSaved"></modalAddSeason>
    </div>
</template>
<script>
    import paginated from '../../../_Core/Mixins/paginatedMixin'

    import modalAddSeason from '../../Modals/Seasons/add.vue'

    export default {
        mixins: [
            paginated
        ],
        components: {
            modalAddSeason
        },
        props: {
            uid: String,
            urlView: String,
            urlAdd: String,
        },
        data() {
            return {
                header: {
                    key: 'seasonId',
                    columns: [
                        { title: 'Name', field: 'name', href: this.createViewLink },
                        { title: 'Start', field: 'dateStart' },
                        { title: 'End', field: 'dateEnd' },
                    ]
                },
                filter: {
                    cacheKey: `${this.uid}/seasons/index`
                }
            }
        },
        computed: {

        },
        async created() {
            const vm = this;

            const filter = vm.filter;

            const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};
            const urlParams = new URLSearchParams(window.location.search);

            vm.initializeFilter(cache);

            await vm.search();
        },
        async mounted() {

        },
        methods: {

            async  seasonSaved(id, flag) {
                const vm = this;

                vm.$refs.modalAddSeason.close();
                vm.$bvToast.toast('Season created.', { title: 'Add Season', variant: 'success', toaster: 'b-toaster-bottom-right' });

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

                vm.busy = true;

                const query = [
                    '?c=', encodeURIComponent(filter.query.criteria),
                    '&p=', filter.query.pageIndex,
                    '&s=', filter.query.pageSize,
                    '&sf=', filter.query.sortField,
                    '&so=', filter.query.sortOrder
                ].join('');

                await vm.search_internal(`api/seasons`, query, 'Seasons',
                    () => {
                        localStorage.setItem(vm.filter.cacheKey, JSON.stringify({
                            criteria: filter.query.criteria,
                            pageIndex: filter.query.pageIndex,
                            pageSize: filter.query.pageSize,
                            sortField: filter.query.sortField,
                            sortOrder: filter.query.sortOrder,
                            visible: filter.visible
                        }));

                        filter.items.forEach(item => {
                            item.dateStart = moment(item.dateStart).format('YYYY-MM-DD');
                            item.dateEnd = moment(item.dateEnd).format('YYYY-MM-DD');
                        });

                    }, () => {
                        localStorage.removeItem(vm.filter.cacheKey);
                    }, () => {
                        vm.busy = false;
                    });
            },
            add() {
                const vm = this;
                vm.$refs.modalAddSeason.open();
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