<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center pb-2 border-bottom">
            <div class="col">
                <h1 class="h3 mb-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Bloodline
                </h1>
            </div>
            <div class="col-auto">
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>
        <div class="mt-2" v-observe-visibility="{callback: get, once: true}">
            <div class="d-flex flex-row justify-content-between align-items-center py-2">
                <h2 class="h5 mb-0">
                    Information
                </h2>
                <div>
                    <button @click="editBloodline" class="btn btn-primary">
                        <span class="fas fa-fw fa-edit"></span>
                    </button>
                    <button @click="get()" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                </div>
            </div>

            <b-overlay :show="busy">
                <div class="card-body">
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Name</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Description</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.description}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Fowl Count</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.birdCount}}</span>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">

                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>DoB/DoD/Age</td>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(b,i) in filter.items">
                                <tr :key="b.birdId" v-bind:class="{'bg-default': (i%2)==0}">
                                    <td class="align-middle" rowspan="2">
                                        {{getRowNumber(i)}}
                                    </td>
                                    <td>
                                        <div>
                                            <a href="#" @click="viewBirdInfo(b.birdId, $event)" class="text-nowrap">
                                                {{b.name}}
                                            </a>
                                        </div>
                                        <div>{{b.type}}</div>
                                    </td>
                                    <td>
                                        <div>
                                            DoB: {{b.dateStart|moment('YYYY-MM-DD')}}
                                        </div>
                                        <div v-if="b.dead">
                                            DoD: {{b.dateEnd|moment('calendar')}}
                                        </div>
                                        <div>
                                            Age: {{b.age}}
                                        </div>
                                    </td>
                                </tr>
                                <tr v-bind:class="{'bg-default': (i%2)==0}">
                                    <td colspan="3">
                                        <ul class="list-unstyled mb-0" v-if="b.bloodlines">
                                            <li v-for="bl in b.bloodlines">
                                                {{bl.percentage|decimalToFraction}} {{bl.name}} {{bl.genderText}}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div class="py-1 mt-2">
                        <m-pagination :filter="filter" :search="getBirds" show-per-page></m-pagination>
                    </div>
                </div>
            </b-overlay>
        </div>
        <modal-quick-view-bird ref="modalQuickViewBird" :urlView="urlViewBird"></modal-quick-view-bird>
        <modalEditBloodline ref="modalEditBloodline" @updated="bloodlineUpdated"></modalEditBloodline>
    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'

    import modalQuickViewBird from '../../Modals/Birds/quick-view.vue';
    import modalEditBloodline from '../../Modals/Bloodlines/edit.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            modalQuickViewBird,
            modalEditBloodline
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlViewBird: { type: String, required: true }
        },
        data() {
            return {
                item: {
                },

                birdInfos: [],

                filter: {
                    query: {
                        criteria: null,
                        pageIndex: 1,
                        pageSize: 5,
                        sortField: null,
                        sortOrder: -1,
                    },
                    items: [],
                    visible: false
                }
            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {
            async get(visible) {
                if (visible === false) {
                    return
                }

                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/bloodlines/${vm.id}`)
                        .then(resp => {
                            const data = resp.data;

                            vm.item = data;
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }


                vm.getBirds();
            },

            async getBirds(index) {
                const vm = this;

                if (vm.busy)
                    return;

                let filter = vm.filter;
                if (index > 0) {
                    vm.filter.pageIndex = index;
                }

                let q = filter.query;
                const query = [
                    '?c=', encodeURIComponent(q.criteria),
                    '&p=', q.pageIndex,
                    '&s=', q.pageSize,
                    '&sf=', q.sortField,
                    '&so=', q.sortOrder
                ].join('');

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/bloodlines/${vm.id}/birds/${query}`)
                        .then(resp => {
                            filter = Object.assign(vm.filter, resp.data);
                            filter.items.forEach(pb => {

                                const s = moment(pb.dateStart);
                                const e = moment(pb.dateEnd);
                                const n = moment();
                                let age = e.from(s);

                                if (n.isBefore(e))
                                    age = s.fromNow(true);

                                pb.age = age;
                            });
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }

            },

            getRowNumber(index) {
                const filter = this.filter;
                const rowNum = ((filter.pageIndex - 1) * filter.pageSize) + (index + 1);
                return rowNum;
            },

            async viewBirdInfo(id, event) {
                event.preventDefault();

                const vm = this;

                if (vm.busy)
                    return;

                let found = vm.birdInfos.find(e => e.birdId == id);

                if (!found) {
                    try {
                        vm.busy = true;

                        await vm.$util.axios.get(`api/birds/${id}/qinfo`)
                            .then(resp => {
                                const birdInfo = resp.data;
                                const m = moment(birdInfo.dateEnd);
                                birdInfo.dead = moment().diff(m) > 0;

                                vm.birdInfos.push(birdInfo)
                                found = birdInfo;
                            });
                    } catch (e) {
                        vm.$util.handleError(e);
                    } finally {
                        vm.busy = false;
                    }
                }

                vm.$refs.modalQuickViewBird.open(found);
            },

            editBloodline() {
                const vm = this;

                vm.$refs.modalEditBloodline.open(vm.item, false);
            },

            async bloodlineUpdated(id, flag) {
                const vm = this;

                vm.$refs.modalEditBloodline.close();

                await vm.get();
            }
        }
    }
</script>