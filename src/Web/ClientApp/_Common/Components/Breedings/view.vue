<template>
    <div v-cloak>
        <div class="row no-gutters">
            <div class="col">
                <h1 class="h3 mb-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Breeding
                </h1>
            </div>
            <div class="col-auto">
                <button @click="get" type="button" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <b-overlay :show="busy">
            <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.parents }">
                <div @click="toggle('parents')" class="card-header d-flex flex-row justify-content-between align-items-center">
                    <h2 class="h6 mb-0">
                        <span class="fas fa-fw fa-warehouse mr-1"></span>Parent
                    </h2>

                    <span>
                        <span v-if="toggles.parents" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
                <b-collapse v-model="toggles.parents">
                    <div class="text-right p-1">
                        <button v-if="!item.done" @click="done" class="btn btn-primary">
                            <span class="fas fa-fw fa-check-circle mr-1"></span>Done
                        </button>
                    </div>
                    <div class="m-2">
                        <div class="row row-cols-1 row-cols-sm-2">
                            <div class="col">
                                <fieldset v-if="father" class="">
                                    <h2 class="h6 mb-0">Sire</h2>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Name</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">
                                                <a :href="createViewBirdLink(father.birdId)" class="font-weight-bold">
                                                    {{father.name}}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Bloodline</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">
                                                <ul class="list-unstyled mb-0">
                                                    <li v-for="bl in father.bloodlines">
                                                        <span v-if="bl.percentage===1">Full</span>
                                                        <span v-else>{{bl.percentage|decimalToFraction}}</span> {{bl.name}} - {{bl.genderText}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col">
                                <fieldset v-if="mother">
                                    <h2 class="h6 mb-0">Dam</h2>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Name</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">
                                                <a :href="createViewBirdLink(mother.birdId)" class="font-weight-bold">
                                                    {{mother.name}}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Bloodline</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">
                                                <ul class="list-unstyled mb-0">
                                                    <li v-for="bl in mother.bloodlines">
                                                        <span v-if="bl.percentage===1">Full</span>
                                                        <span v-else>{{bl.percentage|decimalToFraction}}</span> {{bl.name}} - {{bl.genderText}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col">
                                <fieldset>
                                    <h2 class="h6 mb-0">Marking</h2>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Egg</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">{{item.eggMarking}}</div>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Chick</label>
                                        <div class="col">
                                            <span class="form-control-plaintext">{{item.chickMarking}}</span>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col">
                                <fieldset>
                                    <h2 class="h6 mb-0">Date</h2>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Started</label>
                                        <div class="col">
                                            <div class="form-control-plaintext">{{item.dateStart|moment('calendar')}}</div>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-0">
                                        <label class="col-4 text-right col-form-label">Ended</label>
                                        <div v-if="item.done" class="col">
                                            <span class="form-control-plaintext">{{item.dateEnd|moment('calendar')}}</span>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>




                    </div>
                </b-collapse>
            </div>

            <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.children }">

                <div @click="toggle('children')" class="card-header d-flex flex-row justify-content-between align-items-center">
                    <h2 class="h6 mb-0">
                        <span class="fas fa-fw fa-th mr-1"></span>Offspring
                    </h2>

                    <span>
                        <span v-if="toggles.children" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>

                <b-collapse v-model="toggles.children">
                    <div v-if="!item.done" class="text-right p-1">
                        <button @click="addOffspring" class="btn btn-primary">
                            <span class="fas fa-fw fa-plus"></span>
                        </button>
                    </div>

                    <div class="table-responsive mb-0">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td class="text-center align-middle">#</td>
                                    <td>Name</td>
                                    <td>Bloodline</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,i) in item.children" :key="item.birdId">
                                    <td class="text-center">{{i+1}}</td>
                                    <td>
                                        <a :href="createViewBirdLink(item.birdId)" class="font-weight-bold text-nowrap">
                                            {{item.name}}
                                        </a>
                                        <div>{{item.type}}</div>

                                    </td>
                                    <td>
                                        <ul class="list-unstyled mb-0">
                                            <li v-for="bl in item.bloodlines" class="text-nowrap">
                                                <span v-if="bl.percentage===1">Full</span>
                                                <span v-else>{{bl.percentage|decimalToFraction}}</span> {{bl.name}} - {{bl.genderText}}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </b-collapse>
            </div>


            <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.breedingPerformance }">

                <div @click="toggle('breedingPerformance')" class="card-header d-flex flex-row justify-content-between align-items-center">
                    <h2 class="h6 mb-0">
                        <span class="fas fa-fw fa-chart-pie mr-1"></span>Breeding Performance
                    </h2>

                    <span>
                        <span v-if="toggles.breedingPerformance" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>

                <b-collapse v-model="toggles.breedingPerformance">
                    <div class="text-right p-1">
                        <button @click="editEggs" class="btn btn-primary">
                            <span class="fas fa-fw fa-edit"></span>
                        </button>
                    </div>
                    <div class="table-responsive mb-0">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center align-middle">
                                    <td>Eggs</td>
                                    <td>Fertile</td>
                                    <td>Hatched</td>
                                    <td>Cocks</td>
                                    <td>Hens</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center align-middle">
                                    <td>
                                        {{item.breedingPerformance.eggs}}
                                    </td>
                                    <td>
                                        {{item.breedingPerformance.fertile}}
                                    </td>
                                    <td>
                                        {{item.breedingPerformance.hatched}}
                                    </td>
                                    <td>
                                        {{item.breedingPerformance.cocks}}
                                    </td>
                                    <td>
                                        {{item.breedingPerformance.hens}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </b-collapse>
            </div>

            <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.pitPerformance }">

                <div @click="toggle('pitPerformance')" class="card-header d-flex flex-row justify-content-between align-items-center">
                    <h2 class="h6 mb-0">
                        <span class="fas fa-fw fa-chart-line mr-1"></span>Pit Performance
                    </h2>

                    <span>
                        <span v-if="toggles.pitPerformance" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>

                <b-collapse v-model="toggles.pitPerformance">

                    <div class="table-responsive mb-0">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center align-middle">
                                    <td>Win</td>
                                    <td>Lose</td>
                                    <td>Draw</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center align-middle">
                                    <td>
                                        {{item.pitPerformance.wins}}
                                    </td>
                                    <td>
                                        {{item.pitPerformance.loses}}
                                    </td>
                                    <td>
                                        {{item.pitPerformance.draws}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </b-collapse>
            </div>

        </b-overlay>

        <modalAddOffspring ref="modalAddOffspring" @saved="addOffspringSaved"></modalAddOffspring>

        <modalEditEggs ref="modalEditEggs" @updated="eggsUpdated"></modalEditEggs>
    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'
    import modalAddOffspring from '../../Modals/Birds/add-offspring.vue';
    import modalEditEggs from '../../Modals/Breedings/edit-eggs.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            modalAddOffspring,
            modalEditEggs
        },
        props: {
            uid: String,
            id: String,
            urlViewBird: String,
            urlAddBird: String
        },
        data() {
            return {
                togglesKey: `view-breeding/${this.uid}/toggles`,
                toggles: {
                    parents: true,
                    children: true,
                    breedingPerformance: false,
                    pitPerformance: false,
                },
                item: {
                    parents: [],
                    children: [],
                    breedingPerformance: {},
                    pitPerformance: {}
                },
            };
        },
        computed: {
            father() {
                const vm = this;

                const item = vm.item.parents.find(e => e.gender === 1);

                return item;
            },
            mother() {
                const vm = this;

                const item = vm.item.parents.find(e => e.gender === 2);

                return item;
            },
        },
        async created() {
            const vm = this;

            const toggles = JSON.parse(localStorage.getItem(vm.togglesKey)) || null;

            if (toggles)
                vm.toggles = toggles;

            await vm.get();
        },
        async mounted() {

        },
        methods: {
            toggle(key) {
                const vm = this;

                vm.toggles[key] = !vm.toggles[key];

                localStorage.setItem(vm.togglesKey, JSON.stringify(vm.toggles));
            },

            async get() {
                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/breedings/${vm.id}`)
                        .then(resp => {
                            vm.item = resp.data;

                            const start = moment(vm.item.dateStart);
                            const end = moment(vm.item.dateEnd);


                            vm.item.done = moment().isAfter(end);

                            //let duration = start.fromNow();
                            //if (vm.item.done) {
                            //    duration = start.from(end, true);;
                            //}


                            vm.item.dateStart = start;
                            //vm.$set(vm.item, 'duration', duration);

                        });
                    
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            createViewBirdLink(id) {
                const vm = this;

                const url = `${vm.urlViewBird}${id}`;

                return url;
            },

            async done() {
                const vm = this;

                const yes = await vm.$bvModal.msgBoxConfirm(`Are you sure you want to set this breeding to Done?`)
                    .then(resp => {
                        return resp;
                    });

                if (!yes)
                    return;

                try {
                    const payload = {
                        breedingId: vm.item.breedingId,
                        dateEnd: moment(),
                        token: vm.item.token
                    };

                    await vm.$util.axios.post(`api/breedings/end`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Breeding set to done.', { title: 'Update Breeding', variant: 'success', toaster: 'b-toaster-bottom-right' });
                            vm.get();
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            addOffspring() {
                const vm = this;

                vm.$refs.modalAddOffspring.open(vm.id);
            },

            async addOffspringSaved(id, flag) {
                const vm = this;

                vm.$refs.modalAddOffspring.close();
                vm.$bvToast.toast('Offsping added', { title: 'Add Offspring', variant: 'success', toaster: 'b-toaster-bottom-right' });

                setTimeout(async () => {
                    if (flag) {
                        const url = vm.createViewBirdLink(id);

                        vm.$util.href(url);
                    }
                    else {
                        await vm.get();
                    }
                }, 500);
            },

            editEggs() {
                const vm = this;

                vm.$refs.modalEditEggs.open(vm.id, vm.item.token, vm.item.breedingPerformance);
            },

            async eggsUpdated() {
                const vm = this;

                vm.$refs.modalEditEggs.close();
                vm.$bvToast.toast('Eggs updated', { title: 'Edit Eggs', variant: 'success', toaster: 'b-toaster-bottom-right' });

                await vm.get();
            }
        }
    }
</script>