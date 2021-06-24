<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center pb-2 border-bottom">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Add Breeding
                </h1>
            </div>
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <button v-bind:disabled="!formIsValid" id="btnGroupSave" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="fas fa-fw fa-save mr-1"></span>Save
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupSave">
                        <a class="dropdown-item" href="#" @click="save(true, $event)">Save and Add</a>
                        <a class="dropdown-item" href="#" @click="save(false, $event)">Save and View</a>
                    </div>
                </div>

                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <div class="mt-2">
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Season</label>
                <div class="col col-sm-6 col-md-4">
                    <b-form-select v-model="item.seasonId" :options="filteredSeasons" v-bind:class="{'is-invalid':validations.get('seasonId')}">
                    </b-form-select>
                    <span v-if="validations.has('seasonId')" class="text-danger">
                        {{validations.get('seasonId')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Pen</label>
                <div class="col col-sm-6 col-md-4">
                    <b-form-select v-model="item.penId" :options="filteredPens" v-bind:class="{'is-invalid':validations.get('penId')}">
                    </b-form-select>
                    <span v-if="validations.has('penId')" class="text-danger">
                        {{validations.get('penId')}}
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Sire</label>
                <div class="col col-sm-6 col-md-4">
                    <b-form-select v-model="item.fatherId" :options="broodCocks" v-bind:class="{'is-invalid':validations.get('fatherId')}">
                    </b-form-select>
                    <span v-if="validations.has('fatherId')" class="text-danger">
                        {{validations.get('fatherId')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Dam</label>
                <div class="col col-sm-6 col-md-4">
                    <b-form-select v-model="item.motherId" :options="broodHens" v-bind:class="{'is-invalid':validations.get('motherId')}">
                    </b-form-select>
                    <span v-if="validations.has('motherId')" class="text-danger">
                        {{validations.get('motherId')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Egg Marking</label>
                <div class="col col-md-6">
                    <input :value="item.eggMarking.toUpperCase()" @input="item.eggMarking = $event.target.value.toUpperCase()"
                           type="text"
                           class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Chick Marking</label>
                <div class="col col-md-6">
                    <input :value="item.chickMarking.toUpperCase()" @input="item.chickMarking = $event.target.value.toUpperCase()"
                           type="text"
                           class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Date Start</label>
                <div class="col col-sm-6 col-md-4">
                    <input type="datetime-local" v-model="item.dateStart" class="form-control" v-bind:class="{'is-invalid':validations.get('dateStart')}" />
                    <span v-if="validations.has('dateStart')" class="text-danger">
                        {{validations.get('dateStart')}}
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Notes</label>
                <div class="col col-md-6">
                    <textarea v-model="item.notes" class="form-control"></textarea>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'


    export default {
        mixins: [
            page
        ],
        components: {
        },
        props: {
            uid: { type: String, required: true },
            urlView: { type: String, required: true },
        },
        data() {
            return {
                isDirty: false,
                validations: new Map(),
                item: {
                    eggMarking: '',
                    chickMarking: '',
                    dateStart: moment().format('YYYY-MM-DDThh:mm:ss')
                },

                birdsOpenForBreeding: [],
                seasons: [],
                pens: []
            };
        },
        computed: {
            filteredSeasons() {
                const vm = this;

                const items = vm.seasons.map(e => {
                    const ds = moment(e.dateStart).format('MMM DD');
                    const de = moment(e.dateEnd).format('MMM DD');
                    return {
                        value: e.seasonId,
                        text: `${e.name} [${ds} to ${de}]`
                    }
                });

                return items;
            },

            filteredPens() {
                const vm = this;

                const items = vm.pens.filter(e => e.penType === 1).map(e => {
                    return {
                        value: e.penId,
                        text: `${e.name}`
                    }
                });

                return items;
            },

            broodCocks() {
                const vm = this;

                const list = vm.birdsOpenForBreeding.filter(b => b.gender === 1).map(b => {

                    const item = {
                        value: b.birdId,
                        text: b.name
                    };

                    return item;
                });

                return list;
            },

            broodHens() {
                const vm = this;

                const list = vm.birdsOpenForBreeding.filter(b => b.gender === 2).map(b => {

                    const item = {
                        value: b.birdId,
                        text: b.name
                    };

                    return item;
                });

                return list;
            },

            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.seasonId)
                    validations.set('seasonId', 'Season is required.');
                if (!item.penId)
                    validations.set('penId', 'Pen is required.');
                if (!item.fatherId)
                    validations.set('fatherId', 'Father is required.');
                if (!item.motherId)
                    validations.set('motherId', 'Mother is required.');
                if (!item.dateStart)
                    validations.set('dateStart', 'Date Start is required.');
                else {
                    if (item.seasonId) {
                        //  check if inside season
                        var season = vm.seasons.find(e => e.seasonId == item.seasonId);

                        var ds = moment(season.dateStart);
                        var de = moment(season.dateEnd);
                        var inRange = moment(item.dateStart).isBetween(ds, de);

                        if (!inRange) {
                            validations.set('dateStart', `Should be between ${ds.format("YYYY-MM-DD")} and ${de.format("YYYY-MM-DD")}`);
                        }
                    }
                }

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {
            const vm = this;

            await Promise.all([vm.getSeasons(), vm.getBirdsOpenForBreeding(), vm.getPens()]);
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

            async getPens() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/pens`)
                        .then(resp => vm.pens = resp.data);

                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async getBirdsOpenForBreeding() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/openForBreeding`)
                        .then(resp => vm.birdsOpenForBreeding = resp.data);

                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async save(flag, event) {
                event.preventDefault();

                const vm = this;
                const item = vm.item;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        seasonId: item.seasonId,
                        penId: item.penId,
                        fatherId: item.fatherId,
                        motherId: item.motherId,
                        eggMarking: item.eggMarking,
                        chickMarking: item.chickMarking,
                        dateStart: moment(item.dateStart),
                        notes: item.notes
                    };

                    await vm.$util.axios.post(`api/breedings`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Breeding created.', { title: 'Add Breeding', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            setTimeout(() => {
                                let url = `${vm.urlView}${resp.data}/?r=${vm.rurl}`;

                                if (flag) {
                                    location.reload();
                                } else {
                                    const url = `${vm.urlView}${resp.data}/?r=${vm.rurl}`;
                                    vm.$util.href(url);
                                }

                            }, 500);
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                    //var foo = vm.$util.getErrorMessageInHtml(e);

                    //alert(foo);
                } finally {
                    vm.busy = false;
                }
            }
        }
    }
</script>