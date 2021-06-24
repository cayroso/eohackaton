<template>
    <b-modal ref="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             size="md">
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Add Pit Record
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <div class="d-flex flex-row justify-content-between">
                <button @click="save(false)" class="btn btn-primary">
                    Save
                </button>
                <button @click="close()" class="btn btn-secondary ml-1">
                    Close
                </button>
            </div>

        </template>
        <div>
            <b-overlay :show="busy">
                <fieldset>
                    <legend class="h5">Event</legend>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Date</label>
                        <div class="col-sm">
                            <input type="datetime-local" v-model="item.date" class="form-control" v-bind:class="{'is-invalid':validations.get('date')}" />
                            <span v-if="validations.has('date')" class="text-danger">
                                {{validations.get('date')}}
                            </span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Type</label>
                        <div class="col-sm">
                            <b-form-radio-group v-model="item.battleType" class="form-control" v-bind:class="{'is-invalid':validations.get('battleType')}">
                                <b-form-radio value="1">Hack Fight</b-form-radio>
                                <b-form-radio value="2">Derby</b-form-radio>
                                <b-form-radio value="3">Circuit</b-form-radio>
                            </b-form-radio-group>

                            <span v-if="validations.has('battleType')" class="text-danger">
                                {{validations.get('battleType')}}
                            </span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Name</label>
                        <div class="col-sm">
                            <input v-model="item.eventName" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Location</label>
                        <div class="col-sm">
                            <textarea v-model="item.location" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Weight</label>
                        <div class="col-sm">
                            <input v-model="item.weight" type="number" class="form-control" v-bind:class="{'is-invalid':validations.get('weight')}" />
                            <span v-if="validations.has('weight')" class="text-danger">
                                {{validations.get('weight')}}
                            </span>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend class="h5">Result</legend>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Resut</label>
                        <div class="col-sm">
                            <b-form-radio-group v-model="item.result" class="form-control" v-bind:class="{'is-invalid':validations.get('result')}">
                                <b-form-radio value="1">Win</b-form-radio>
                                <b-form-radio value="0">Lose</b-form-radio>
                                <b-form-radio value="2">Draw</b-form-radio>
                            </b-form-radio-group>

                            <span v-if="validations.has('result')" class="text-danger">
                                {{validations.get('result')}}
                            </span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Injuries</label>
                        <div class="col-sm">
                            <input v-model="item.injuries" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Description</label>
                        <div class="col-sm">
                            <textarea v-model="item.description" class="form-control"></textarea>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="d-flex flex-row justify-content-between align-items-center mb-1">
                        <h2 class="h5">Gaff</h2>
                        <button @click="gaffExpand = !gaffExpand" class="btn btn-sm btn-outline-primary">
                            <span v-if="gaffExpand" class="fas fa-fw fa-angle-double-up"></span>
                            <span v-else class="fas fa-fw fa-angle-double-down"></span>
                        </button>
                    </div>
                    <b-collapse v-model="gaffExpand">
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Gaffer</label>
                            <div class="col-sm">
                                <input v-model="item.gaffer" type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Setting</label>
                            <div class="col-sm">
                                <input v-model="item.gaffSetting" type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Description</label>
                            <div class="col-sm">
                                <textarea v-model="item.gaffDescription" class="form-control"></textarea>
                            </div>
                        </div>
                    </b-collapse>
                </fieldset>



                <fieldset>
                    <div class="d-flex flex-row justify-content-between align-items-center mb-1">
                        <h2 class="h5">Opponent</h2>
                        <button @click="opponentExpand = !opponentExpand" class="btn btn-sm btn-outline-primary">
                            <span v-if="opponentExpand" class="fas fa-fw fa-angle-double-up"></span>
                            <span v-else class="fas fa-fw fa-angle-double-down"></span>
                        </button>
                    </div>
                    <b-collapse v-model="opponentExpand">
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Owner</label>
                            <div class="col-sm">
                                <input v-model="item.opponentOwner" type="text" class="form-control" placeholder="Opponent owner" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Notes</label>
                            <div class="col-sm">
                                <input v-model="item.notes" type="text" class="form-control" placeholder="Opponent notes" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 text-sm-right col-form-label">Description</label>
                            <div class="col-sm">
                                <textarea v-model="item.opponentDescription" class="form-control" placeholder="Opponent description"></textarea>
                            </div>
                        </div>
                    </b-collapse>
                </fieldset>
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
                gaffExpand: false,
                opponentExpand: false,
                busy: false,
                validations: new Map(),
                birdName: null,
                item: {}
            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async open(birdId, birdName) {
                const vm = this;

                vm.birdName = birdName;

                vm.item = {
                    birdId: birdId,

                    eventName: null,
                    battleType: null,
                    location: null,
                    weight: null,

                    gaffDescription: null,
                    gaffSetting: null,
                    gaffer: null,

                    result: null,
                    injuries: null,
                    description: null,

                    opponentDescription: null,
                    opponentOwner: null,
                    notes: null,

                    date: moment().format('YYYY-MM-DDTHH:mm')
                };

                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            formIsValid() {
                const vm = this;
                const item = vm.item;
                const validations = new Map();

                if (!item.date)
                    validations.set('date', 'Date is required.');

                if (!item.battleType)
                    validations.set('battleType', 'Event type is required.');

                if (!item.weight || item.weight <= 0)
                    validations.set('weight', 'Weight is required.');
                if (item.result != 0 && item.result != 1 && item.result != 2)
                    validations.set('result', 'Result is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },

            async save(flag) {
                const vm = this;
                const item = vm.item;
                if (vm.busy)
                    return;

                if (!vm.formIsValid())
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        //arena: item.arena,
                        birdId: item.birdId,
                        date: moment(item.date),
                        description: item.description,
                        eventName: item.eventName,
                        gaffDescription: item.gaffDescription,
                        gaffSetting: item.gaffSetting,
                        gaffer: item.gaffer,
                        injuries: item.injuries,

                        location: item.location,
                        notes: item.notes,
                        opponentDescription: item.opponentDescription,
                        opponentOwner: item.opponentOwner,
                        battleType: item.battleType,
                        result: item.result,
                        weight: item.weight
                    }

                    await vm.$util.axios.post(`api/battles`, payload)
                        .then(resp => {
                            vm.$emit('saved', resp.data);
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