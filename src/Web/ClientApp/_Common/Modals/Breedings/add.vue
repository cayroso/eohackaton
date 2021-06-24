<template>
    <b-modal ref="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             header-class=""
             body-class=""
             footer-class=""
             scrollable>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Add Breeding
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save(false)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                Save
            </button>
            <button @click="save(true)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                Save and View
            </button>
            <button @click="close()" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <b-overlay :show="busy">
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Season</label>
                    <div class="col">
                        <b-form-select v-model="item.seasonId" :options="filteredSeasons" v-bind:class="{'is-invalid':validations.get('seasonId')}">
                        </b-form-select>
                        <span v-if="validations.has('seasonId')" class="text-danger">
                            {{validations.get('seasonId')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Pen</label>
                    <div class="col">
                        <b-form-select v-model="item.penId" :options="filteredPens" v-bind:class="{'is-invalid':validations.get('penId')}">
                        </b-form-select>
                        <span v-if="validations.has('penId')" class="text-danger">
                            {{validations.get('penId')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Sire</label>
                    <div class="col">
                        <b-form-select v-model="item.fatherId" :options="broodCocks" v-bind:class="{'is-invalid':validations.get('fatherId')}">
                        </b-form-select>
                        <span v-if="validations.has('fatherId')" class="text-danger">
                            {{validations.get('fatherId')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Dam</label>
                    <div class="col">
                        <b-form-select v-model="item.motherId" :options="broodHens" v-bind:class="{'is-invalid':validations.get('motherId')}">
                        </b-form-select>
                        <span v-if="validations.has('motherId')" class="text-danger">
                            {{validations.get('motherId')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Toe Mark</label>
                    <div class="col">
                        <input type="text" v-model="item.toeMark" class="form-control"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Nose Mark</label>
                    <div class="col">
                        <input type="text" v-model="item.noseMark" class="form-control"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Date Start</label>
                    <div class="col">
                        <input type="datetime-local" v-model="item.dateStart" class="form-control" v-bind:class="{'is-invalid':validations.get('dateStart')}" />
                        <span v-if="validations.has('dateStart')" class="text-danger">
                            {{validations.get('dateStart')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Notes</label>
                    <div class="col">
                        <textarea v-model="item.notes" class="form-control"></textarea>
                    </div>
                </div>
            </b-overlay>
        </div>
    </b-modal>
</template>
<script>
    export default {
        mixins: [
        ],
        components: {
        },
        props: {

        },
        data() {
            return {
                busy: false,
                isDirty: false,
                validations: new Map(),

                item: {},

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
                        text: e.name
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

            async open() {
                const vm = this;

                await Promise.all([vm.getSeasons(), vm.getBirdsOpenForBreeding(), vm.getPens()]);

                vm.item = {
                    seasonId: null,
                    penId: null,
                    fatherId: null,
                    motherId: null,
                    toeMark: null,
                    noseMark: null,
                    notes: null,
                    dateStart: moment().format('YYYY-MM-DDTHH:mm')
                };

                vm.isDirty = false;
                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },



            async save(flag) {
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
                        toeMark: item.toeMark,
                        noseMark: item.noseMark,
                        dateStart: moment(item.dateStart),
                        notes: item.notes
                    };

                    await vm.$util.axios.post(`api/breedings`, payload)
                        .then(resp => {
                            vm.$emit('saved', resp.data, flag);
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            }
        }
    }
</script>