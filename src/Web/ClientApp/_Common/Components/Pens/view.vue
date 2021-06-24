<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Pen
                </h1>
            </div>
            <div class="col-auto">
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <div class="mt-2 border-top" v-observe-visibility="{callback: get, once: true}">
            <div class="d-flex flex-row justify-content-between align-items-center py-2">
                <h2 class="h5 mb-0">
                    Information
                </h2>
                <div>
                    <button @click="edit()" class="btn btn-primary">
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
                        <label class="col-4 text-right col-form-label">Type</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.penTypeText}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Description</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.description}}</span>
                        </div>
                    </div>
                </div>

                <div class="table-responsive mb-0">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h2 class="h5">
                            Breedings
                        </h2>
                        <b-form-checkbox v-model="activeBreedingOnly"
                                         @input="get()">
                            Active Breeding Only
                        </b-form-checkbox>
                    </div>
                    
                    <table-list :header="{key: 'breedingId', columns:[]}" :items="item.breedings" :getRowNumber="getRowNumber" :isSelected="$util.noop" :setSelected="$util.noop">
                        <template #header>
                            <th>#</th>
                            <th>Parents</th>
                            <th>Performance</th>
                            <th>Date</th>
                        </template>
                        <template v-slot:table="row">
                            <tr>
                                <td>{{row.index+1}}</td>
                                <td>
                                    <a :href="createViewBreedingLink(row.item.breedingId)" class="font-weight-bold">
                                        <p v-for="p in row.item.parents">
                                            {{p.name}}
                                        </p>
                                    </a>
                                </td>
                                <td>
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

                                </td>
                            </tr>
                        </template>
                        <template slot="list" slot-scope="row">
                            <div>
                                <div class="form-group mb-0 row no-gutters">
                                    <label class="col-5 col-form-label">Title</label>
                                    <div class="col">
                                        <span class="form-control-plaintext">
                                            <a href="#" class="text-nowrap">
                                                <p v-for="p in row.item.parents">
                                                    {{p.name}}
                                                </p>

                                            </a>
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group mb-0 row no-gutters">
                                    <label class="col-5 col-form-label">Perfomance</label>
                                    <div class="col">
                                        <span class="form-control-plaintext">
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
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </template>
                    </table-list>
                </div>
            </b-overlay>
        </div>

        <modal-edit-pen ref="modalEditPen" @updated="updated"></modal-edit-pen>
    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'

    import modalEditPen from '../../Modals/Pens/edit.vue';
    
    export default {
        mixins: [
            page
        ],
        components: {
            modalEditPen,
    
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlViewBreeding: { type: String, required: true },
        },
        data() {
            return {
                activeBreedingOnly: true,
                item: {},
                birdInfos: []
            };
        },
        computed: {

        },
        async created() {
            const vm = this;

        },
        async mounted() {

        },
        methods: {
            getRowNumber(value) {
                return value;
            },
           
            createViewBreedingLink(id) {
                const vm = this;
                const url = `${vm.urlViewBreeding}${id}`;
                return url;
            },
            async get() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/pens/${vm.id}/?abo=${vm.activeBreedingOnly}`)
                        .then(resp => {
                            const data = resp.data;

                            data.breedings.forEach(pb => {

                                const s = moment(pb.dateStart);
                                const e = moment(pb.dateEnd);
                                const n = moment();
                                let duration = e.from(s);

                                if (n.isBefore(e))
                                    duration = s.fromNow(true);

                                pb.isDone = moment().isAfter(e);
                                pb.duration = duration;

                                pb.pctFertility = ((pb.fertile / pb.eggs) * 100).toFixed(0);
                                pb.pctHatchability = ((pb.hatched / pb.fertile) * 100).toFixed(0);

                                pb.birds = pb.cocks + pb.hens;
                                pb.fights = pb.wins + pb.loses + pb.draws;
                            });

                            vm.item = data;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },


            //async viewBirdInfo(id, event) {
            //    event.preventDefault();

            //    const vm = this;

            //    if (vm.busy)
            //        return;

            //    let found = vm.birdInfos.find(e => e.birdId == id);

            //    if (!found) {
            //        try {
            //            vm.busy = true;

            //            await vm.$util.axios.get(`api/birds/${id}/qinfo`)
            //                .then(resp => {
            //                    const birdInfo = resp.data;
            //                    const m = moment(birdInfo.dateEnd);
            //                    birdInfo.dead = moment().diff(m) > 0;

            //                    vm.birdInfos.push(birdInfo)
            //                    found = birdInfo;
            //                });
            //        } catch (e) {
            //            vm.$util.handleError(e);
            //        } finally {
            //            vm.busy = false;
            //        }
            //    }

            //    vm.$refs.modalQuickViewBird.open(found);
            //},

            edit() {
                const vm = this;

                vm.$refs.modalEditPen.open(vm.item);
            },

            async updated() {
                const vm = this;

                vm.$refs.modalEditPen.close();
                await vm.get();
            }
        }
    }
</script>