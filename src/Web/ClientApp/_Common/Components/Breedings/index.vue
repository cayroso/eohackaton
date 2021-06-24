<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Breedings
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
                    <label>Show Completed</label>
                    <div class="">
                        <b-form-checkbox v-model="filter.query.showCompleted" class="form-control-plaintext">
                            Show Completed
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="form-group mb-2 mx-1">
                    <label>Season</label>
                    <div class="">
                        <b-form-select v-model="filter.query.seasonId" :options="filteredSeasons">
                        </b-form-select>
                    </div>
                </div>
            </div>
        </b-collapse>

        <b-overlay :show="busy">
            <div class="mt-2">
                <table-list :header="header" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="table-sm table-bordered">
                    <template #header>
                        <th>#</th>
                        <th>Parent</th>
                        <th>Marking</th>
                        <th>Performance</th>
                        <th>Dates</th>
                    </template>
                    <template slot="table" slot-scope="row">
                        <tr>
                            <td>{{getRowNumber(row.index)}}</td>
                            <td>
                                <a :href="createViewLink(row.item.breedingId)" class="font-weight-bold">

                                    <p v-for="p in row.item.parents" v-text="p.name"></p>

                                </a>
                            </td>

                            <td>

                                <div class="form-group mb-lg-0 row no-gutters">
                                    <label class="col-sm-6 col-form-label">Egg:</label>
                                    <div class="col-sm">
                                        <span class="form-control-plaintext">
                                            {{row.item.eggMarking}}
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group mb-lg-0 row no-gutters">
                                    <label class="col-sm-6 col-form-label">Chick:</label>
                                    <div class="col-sm">
                                        <span class="form-control-plaintext">
                                            {{row.item.chickMarking}}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>Fertility</span>
                                <b-progress :max="row.item.eggs" height="20px">
                                    <b-progress-bar :value="row.item.fertile" :label="`${row.item.pctFertility}%`" variant="success"></b-progress-bar>
                                </b-progress>

                                <span>Hatchability</span>
                                <b-progress :max="row.item.fertile" height="20px">
                                    <b-progress-bar :value="row.item.hatched" :label="`${row.item.pctHatchability}%`" variant="success"></b-progress-bar>
                                </b-progress>

                                <span>Cock/Hen Ratio</span>
                                <b-progress :max="row.item.birds" height="20px">
                                    <b-progress-bar :value="row.item.cocks" :label="`${row.item.cocks} cock`" variant="success"></b-progress-bar>
                                    <b-progress-bar :value="row.item.hens" :label="`${row.item.hens} hen`" variant="info"></b-progress-bar>
                                </b-progress>

                                <span>Pit</span>
                                <b-progress :max="row.item.fights" height="20px">
                                    <b-progress-bar :value="row.item.wins" :label="`${row.item.wins} win`" variant="success"></b-progress-bar>
                                    <b-progress-bar :value="row.item.loses" :label="`${row.item.loses} lose`" variant="danger"></b-progress-bar>
                                    <b-progress-bar :value="row.item.draws" :label="`${row.item.draws} draw`" variant="warning"></b-progress-bar>
                                </b-progress>
                            </td>



                            <td>
                                <div class="form-group mb-lg-0 row no-gutters">
                                    <label class="col-sm-5 col-form-label">Start</label>
                                    <div class="col-sm align-self-center">
                                        {{row.item.dateStart|moment('calendar')}}
                                    </div>
                                </div>
                                <div class="form-group mb-lg-0 row no-gutters">
                                    <label class="col-sm-5 col-form-label">End</label>
                                    <div class="col-sm align-self-center">
                                        <span v-if="row.item.isDone">
                                            {{row.item.dateEnd|moment('calendar')}}
                                        </span>
                                        <span v-else>
                                            On-going
                                        </span>
                                    </div>
                                </div>
                                <!--<div class="form-group mb-lg-0 row no-gutters">
            <label class="col-sm-5 col-form-label">Duration</label>
            <div class="col-sm align-self-center">
                {{row.item.duration}}
            </div>
        </div>-->
                            </td>
                        </tr>
                    </template>

                    <template slot="list" slot-scope="row">
                        <div>
                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-4 col-form-label">Parent</label>
                                <div class="col">
                                    <span class="form-control-plaintext">
                                        <a :href="createViewLink(row.item.breedingId)">
                                            <div v-for="p in row.item.parents" v-text="p.name"></div>
                                        </a>
                                    </span>
                                </div>
                            </div>



                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-4 col-form-label">Marking</label>
                                <div class="col align-self-center">

                                    <div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Egg</label>
                                        <div class="col align-self-center">
                                            {{row.item.eggMarking}}
                                        </div>
                                    </div>
                                    <div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Chick</label>
                                        <div class="col align-self-center">
                                            {{row.item.chickMarking}}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-4 col-form-label">Performance</label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        <span>
                                            Fertility
                                        </span>
                                        <b-progress :max="row.item.eggs" height="20px">
                                            <b-progress-bar :value="row.item.fertile" :label="`${row.item.pctFertility}%`" variant="success"></b-progress-bar>
                                        </b-progress>

                                        <span>
                                            Hatchability
                                        </span>
                                        <b-progress :max="row.item.fertile" height="20px">
                                            <b-progress-bar :value="row.item.hatched" :label="`${row.item.pctHatchability}%`" variant="success"></b-progress-bar>
                                        </b-progress>

                                        <span>
                                            Cock/Hen Ratio
                                        </span>
                                        <b-progress :max="row.item.birds" height="20px">
                                            <b-progress-bar :value="row.item.cocks" :label="`${row.item.cocks} cock`" variant="success"></b-progress-bar>
                                            <b-progress-bar :value="row.item.hens" :label="`${row.item.hens} hen`" variant="info"></b-progress-bar>
                                        </b-progress>

                                        <span>
                                            Pit
                                        </span>
                                        <b-progress :max="row.item.fights" height="20px">
                                            <b-progress-bar :value="row.item.wins" :label="`${row.item.wins} win`" variant="success"></b-progress-bar>
                                            <b-progress-bar :value="row.item.loses" :label="`${row.item.loses} lose`" variant="danger"></b-progress-bar>
                                            <b-progress-bar :value="row.item.draws" :label="`${row.item.draws} draw`" variant="warning"></b-progress-bar>
                                        </b-progress>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mb-0 row no-gutters">
                                <label class="col-4 col-form-label">Dates</label>
                                <div class="col">
                                    <div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Start</label>
                                        <div class="col align-self-center">
                                            {{row.item.dateStart|moment('calendar')}}
                                        </div>
                                    </div>
                                    <div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">End</label>
                                        <div class="col align-self-center">
                                            <span v-if="row.item.isDone">
                                                {{row.item.dateEnd|moment('calendar')}}
                                            </span>
                                            <span v-else>
                                                On-going
                                            </span>
                                        </div>
                                    </div>
                                    <!--<div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Duration</label>
                                        <div class="col align-self-center">
                                            {{row.item.duration}}
                                        </div>
                                    </div>-->
                                </div>
                            </div>

                        </div>
                    </template>


                </table-list>


            </div>
        </b-overlay>

        <m-pagination :filter="filter" :search="search" class="mt-2" show-per-page></m-pagination>

        <modal-add-breeding ref="modalAddBreeding" @saved="saved"></modal-add-breeding>
    </div>
</template>
<script>
    import paginated from '../../../_Core/Mixins/paginatedMixin'
    import modalAddBreeding from '../../Modals/Breedings/add.vue'; 
    
    export default {
        mixins: [
            paginated
        ],
        components: {
            modalAddBreeding
        },
        props: {
            uid: String,
            urlView: String,
            urlAdd: String,
        },
        data() {
            return {
                header: {
                    key: 'breedingId',
                    columns: [
                        { title: 'Parent', field: 'parent', href: this.createViewLink },
                        { title: 'Production', field: 'type' },
                        { title: 'Pit', field: 'dateOfBirth' },
                        { title: 'Marking', field: 'banding' },
                        { title: 'Duration', field: 'marking' },
                    ]
                },
                filter: {
                    cacheKey: `${this.uid}/breedings/index`,
                    query: {
                        seasonId: '',
                        showCompleted: false,
                    }
                },
                seasons: [],
            }
        },
        computed: {

            filteredSeasons() {
                const vm = this;

                const items = vm.seasons.map(e => {
                    return {
                        value: e.seasonId,
                        text: e.name
                    }
                });

                items.unshift({ value: '', text: 'All' });

                return items;
            },
        },
        async created() {
            const vm = this;
            const filter = vm.filter;

            const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};
            const urlParams = new URLSearchParams(window.location.search);

            filter.query.seasonId = urlParams.get('seasonId') || cache.seasonId || filter.query.seasonId;
            filter.query.showCompleted = urlParams.get('sc') || cache.showCompleted || filter.query.showCompleted;

            vm.initializeFilter(cache);

            await vm.getSeasons();
            await vm.search();
        },
        async mounted() {

        },
        methods: {

            async getSeasons() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/seasons`)
                        .then(resp => vm.seasons = resp.data);

                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async _search() {
                const vm = this;
                const filter = vm.filter;

                if (vm.busy)
                    return;

                vm.busy = true;

                const query = [
                    '?seaId=', filter.query.seasonId,
                    '&sc=', filter.query.showCompleted,
                    '&c=', encodeURIComponent(filter.query.criteria),
                    '&p=', filter.query.pageIndex,
                    '&s=', filter.query.pageSize,
                    '&sf=', filter.query.sortField,
                    '&so=', filter.query.sortOrder
                ].join('');

                await vm.search_internal(`api/breedings`, query, 'Breedings',
                    () => {
                        localStorage.setItem(vm.filter.cacheKey, JSON.stringify({
                            seasonId: filter.query.seasonId,
                            showCompleted: filter.query.showCompleted,
                            criteria: filter.query.criteria,
                            pageIndex: filter.query.pageIndex,
                            pageSize: filter.query.pageSize,
                            sortField: filter.query.sortField,
                            sortOrder: filter.query.sortOrder,
                            visible: filter.visible
                        }));

                        filter.items.forEach(item => {
                            const ds = moment(item.dateStart);
                            const de = moment(item.dateEnd);


                            //item.name = `${item.father.name} ${item.mother.name}`;

                            item.isDone = moment().isAfter(de);

                            item.duration = item.isDone ? de.from(ds) : ds.fromNow();

                            item.pctFertility = ((item.fertile / item.eggs) * 100).toFixed(0);
                            item.pctHatchability = ((item.hatched / item.fertile) * 100).toFixed(0);

                            item.fights = item.wins + item.loses + item.draws;
                            item.birds = item.cocks + item.hens;
                        });

                    }, () => {
                        localStorage.removeItem(vm.filter.cacheKey);
                    }, () => {
                        vm.busy = false;
                    });
            },

            add() {
                const vm = this;

                //vm.$refs.modalAddBreeding.open();

                const rUrl = btoa(window.location.href);
                const url = `${vm.urlAdd}?r=${rUrl}`;

                vm.$util.href(url);
            },

            async  saved(id, flag) {
                const vm = this;

                vm.$refs.modalAddBreeding.close();
                vm.$bvToast.toast('Bredding created.', { title: 'Add Breeding', variant: 'success', toaster: 'b-toaster-bottom-right' });

                if (flag) {
                    vm.view(id);
                }
                else {
                    await vm.search();
                }
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