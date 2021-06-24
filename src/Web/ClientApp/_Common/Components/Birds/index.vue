<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col-sm">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Birds
                </h1>
            </div>
            <div class="col-sm-auto">
                <div class="d-flex flex-row">
                    <div class="mr-1">
                        <a href="/owner/birds/add" class="btn btn-primary">
                            <span class="fas fa-fw fa-plus"></span>
                        </a>
                    </div>
                    <div v-if="filter.visible" class="mr-1">
                        <button @click="resetFilter()" class="btn btn-primary">
                            <span class="fas fa-fw fa-sync"></span>
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
            <div class="row no-gutters row-cols-2 row-cols-md-4 my-2 px-1 rounded border bg-secondary">
                <div class="col">
                    <div class="form-group mb-2 mx-1">
                        <label>Category</label>
                        <div class="">
                            <b-form-select v-model="filter.query.category" class="form-control">
                                <b-form-select-option value="0">All</b-form-select-option>
                                <b-form-select-option value="1">Battle</b-form-select-option>
                                <b-form-select-option value="2">Brood</b-form-select-option>
                            </b-form-select>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="form-group mb-2 mx-1">
                        <label>Gender</label>
                        <div class="">
                            <b-form-select v-model="filter.query.gender" class="form-control ">
                                <b-form-select-option value="0">All</b-form-select-option>
                                <b-form-select-option value="1">Cock</b-form-select-option>
                                <b-form-select-option value="2">Hen</b-form-select-option>
                            </b-form-select>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="form-group mb-2 mx-1">
                        <label>DoB Start</label>
                        <div>
                            <input type="date" v-model="filter.query.dateStart" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="form-group mb-2 mx-1">
                        <label>DoB End</label>
                        <div>
                            <input type="date" v-model="filter.query.dateEnd" class="form-control" />
                        </div>
                    </div>
                </div>

            </div>
        </b-collapse>

        <b-overlay :show="busy">
            <div class="mt-2">
                
                <table-list :header="header" :items="filter.items" :getRowNumber="getRowNumber" :setSelected="setSelected" :isSelected="isSelected" table-css="table-bordered table-sm">
                    <template v-slot:header>
                        <th>#</th>
                        <th>Name</th>
                        <th>Bloodline</th>
                        <th>Birth Date</th>
                        <th>Banding</th>
                        <th>Marking</th>
                    </template>

                    <template v-slot:table="row">
                        <tr>
                            <td>
                                {{getRowNumber(row.index)}}
                            </td>
                            <td>
                                <a :href="createViewLink(row.item.birdId)" class="font-weight-bold">
                                    {{row.item.name}} <span class="small">{{row.item.type}}</span>
                                </a>                                
                            </td>
                            <td>                                
                                <b-progress :max="1" height="20px">
                                    <b-progress-bar v-for="(bl,i) in row.item.bloodlines" :key="i"
                                                    :value="bl.percentage"
                                                    :label="`${$options.filters.decimalToFraction(bl.percentage)} ${bl.name}`"
                                                    :variant="bl.gender===1? 'success':'info'"></b-progress-bar>
                                </b-progress>

                                <div v-if="row.item.battlePerformance.results.length>0">
                                    <span>Pit Performance</span>
                                    <b-progress :max="row.item.battlePerformance.results.length" height="15">
                                        <b-progress-bar :value="row.item.battlePerformance.wins"
                                                        :label="`${row.item.battlePerformance.wins} win`"
                                                        variant="success"></b-progress-bar>
                                        <b-progress-bar :value="row.item.battlePerformance.loses"
                                                        :label="`${row.item.battlePerformance.loses} lose`"
                                                        variant="danger"></b-progress-bar>
                                        <b-progress-bar :value="row.item.battlePerformance.draws"
                                                        :label="`${row.item.battlePerformance.draws} draw`"
                                                        variant="warning"></b-progress-bar>
                                    </b-progress>
                                </div>
                            </td>
                            <td>
                                {{row.item.dateOfBirth}}
                            </td>
                            <td>
                                {{row.item.banding}}
                            </td>
                            <td>
                                {{row.item.marking}}
                            </td>
                        </tr>
                    </template>

                    <template v-slot:list="row">
                        <div>
                            <div class="form-group row no-gutters">
                                <label class="col-5 col-form-label">
                                    Name
                                </label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        <a :href="createViewLink(row.item.birdId)" class="font-weight-bold">
                                            {{row.item.name}}
                                        </a>
                                        <div>{{row.item.type}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label class="col-5 col-form-label">
                                    Bloodline
                                </label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        <b-progress :max="1" height="20px">
                                            <b-progress-bar v-for="(bl,i) in row.item.bloodlines" :key="i"
                                                            :value="bl.percentage"
                                                            :label="`${$options.filters.decimalToFraction(bl.percentage)} ${bl.name}`"
                                                            :variant="bl.gender==1? 'success':'info'"></b-progress-bar>
                                        </b-progress>
                                        <div v-if="row.item.battlePerformance.results.length>0">
                                            <span>Pit Performance</span>
                                            <b-progress :max="row.item.battlePerformance.results.length" height="25px">
                                                <b-progress-bar :value="row.item.battlePerformance.wins"
                                                                :label="`${row.item.battlePerformance.wins} win`"
                                                                variant="success"></b-progress-bar>
                                                <b-progress-bar :value="row.item.battlePerformance.loses"
                                                                :label="`${row.item.battlePerformance.loses} lose`"
                                                                variant="danger"></b-progress-bar>
                                                <b-progress-bar :value="row.item.battlePerformance.draws"
                                                                :label="`${row.item.battlePerformance.draws} draw`"
                                                                variant="warning"></b-progress-bar>
                                            </b-progress>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label class="col-5 col-form-label">
                                    Date of Birth
                                </label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        {{row.item.dateOfBirth}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label class="col-5 col-form-label">
                                    Banding
                                </label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        {{row.item.banding}}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label class="col-5 col-form-label">
                                    Marking
                                </label>
                                <div class="col">
                                    <div class="form-control-plaintext">
                                        {{row.item.marking}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!--<template v-slot:footer>
                        <tr>
                            <th>TEST</th>
                        </tr>
                    </template>-->
                </table-list>

            </div>
        </b-overlay>

        <m-pagination :filter="filter" :search="search" show-per-page class="mt-2"></m-pagination>

    </div>
</template>
<script>
    import paginated from '../../../_Core/Mixins/paginatedMixin'
    
    export default {
        mixins: [
            paginated
        ],
        components: {
            
        },
        props: {
            uid: String,
            urlView: String,
            urlAdd: String,
        },
        data() {
            return {
                header: {
                    key: 'birdId',
                    columns: []
                },
                filter: {
                    cacheKey: `${this.uid}/fowls/index`,
                    query: {
                        gender: 0,
                        category: 0,
                        dateStart: moment().startOf('year').format('YYYY-MM-DD'),
                        dateEnd: moment().endOf('year').format('YYYY-MM-DD'),
                    }
                },
            }
        },
        computed: {

        },
        async created() {
            const vm = this;

            const filter = vm.filter;

            const cache = JSON.parse(localStorage.getItem(vm.filter.cacheKey)) || {};
            const urlParams = new URLSearchParams(window.location.search);

            filter.query.gender = parseInt(urlParams.get('gender')) || cache.gender || filter.query.gender;
            filter.query.category = parseInt(urlParams.get('category')) || cache.category || filter.query.category;

            const ds = Number.parseInt(urlParams.get('ds')) || cache.dateStart || 0;
            const de = Number.parseInt(urlParams.get('de')) || cache.dateEnd || 0;

            if (ds > 0) {
                filter.query.dateStart = moment(ds).format('YYYY-MM-DD');
            }
            if (de > 0) {
                filter.query.dateEnd = moment(de).format('YYYY-MM-DD');
            }

            vm.initializeFilter(cache);

            await vm.search();
        },
        async mounted() {
        },
        methods: {
            resetFilter() {
                const filter = this.filter;

                filter.query.gender = 0;
                filter.query.category = 0;
                filter.query.dateStart = moment().startOf('year').format('YYYY-MM-DD');
                filter.query.dateEnd = moment().endOf('year').format('YYYY-MM-DD');

            },

            async _search() {
                const vm = this;
                const filter = vm.filter;

                if (vm.busy)
                    return;

                vm.busy = true;

                const query = [
                    '?gender=', filter.query.gender,
                    '&category=', filter.query.category,
                    '&ds=', moment(filter.query.dateStart).valueOf(),
                    '&de=', moment(filter.query.dateEnd).add(23, 'hours').add(59, 'minutes').valueOf(),
                    '&c=', encodeURIComponent(filter.query.criteria),
                    '&p=', filter.query.pageIndex,
                    '&s=', filter.query.pageSize,
                    '&sf=', filter.query.sortField,
                    '&so=', filter.query.sortOrder
                ].join('');

                await vm.search_internal(`/api/birds/search`, query, 'Birds',
                    () => {
                        localStorage.setItem(vm.filter.cacheKey, JSON.stringify({
                            category: filter.category,
                            gender: filter.gender,
                            dateStart: moment(filter.query.dateStart).valueOf(),
                            dateEnd: moment(filter.query.dateEnd).valueOf(),
                            criteria: filter.query.criteria,
                            pageIndex: filter.query.pageIndex,
                            pageSize: filter.query.pageSize,
                            sortField: filter.query.sortField,
                            sortOrder: filter.query.sortOrder,
                            visible: filter.visible
                        }));

                        filter.items.forEach(item => {
                            const e = moment(item.dateEnd);

                            item.dead = moment().isAfter(e);

                            item.dateOfBirth = moment(item.dateStart).format('YYYY-MM-DD');

                        });

                    }, () => {
                        localStorage.removeItem(vm.filter.cacheKey);
                    }, () => {
                        vm.busy = false;
                    });
            },

            add() {
                const vm = this;
                const url = `${vm.urlAdd}`;
                vm.$util.href(url);
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