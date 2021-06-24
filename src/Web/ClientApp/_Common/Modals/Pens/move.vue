<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="false"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             v-cloak>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Move
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save()" v-bind:disabled="!formIsValid" class="btn btn-primary">
                Save
            </button>
            <button @click="close()" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <!--<div class="form-group row">
                <label class="col-3 text-right col-form-label">Current Pen</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.penName}}</span>
                </div>
            </div>-->
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
                <label class="col-3 text-right col-form-label">Date</label>
                <div class="col">
                    <input type="datetime-local" v-model="item.date" class="form-control" v-bind:class="{'is-invalid':validations.get('date')}" />
                    <span v-if="validations.has('date')" class="text-danger">
                        {{validations.get('date')}}
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-3 text-right col-form-label">Comments</label>
                <div class="col">
                    <textarea v-model="item.comments" class="form-control"></textarea>
                </div>
            </div>

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

                pens: [],

                item: {
                    penName: '',
                    birdId: null,
                    penId: null,
                    date: null,
                    comments: ''
                }
            };
        },
        computed: {

            filteredPens() {
                const vm = this;

                const items = vm.pens.map(e => {
                    return {
                        value: e.penId,
                        text: `${e.name} [${e.penTypeText} ${e.load}/${e.capacity}]`
                    }
                });

                return items;
            },


            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.penId)
                    validations.set('penId', 'Pen is required.');
                if (!item.date)
                    validations.set('date', 'Date is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async getPens() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/pens/available`)
                        .then(resp => vm.pens = resp.data);

                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async open(birdId) {
                const vm = this;

                vm.item = {
                    //penName: penName,
                    birdId : birdId,
                    penId: null,
                    date: moment().format('YYYY-MM-DDTHH:mm:ss'),
                    comments: null
                };

                vm.isDirty = false;
                vm.validations.clear();

                await vm.getPens();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async save() {
                const vm = this;
                const item = vm.item;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {

                    const payload = {
                        birdId: item.birdId,
                        penId: item.penId,
                        date: moment(item.date),
                        comments: item.comments
                    };

                    await vm.$util.axios.post(`api/birds/move`, payload)
                        .then(resp => {
                            
                            vm.$emit('saved');

                        });

                } catch (e) {
                    vm.$util.handleError(e);
                }

            }
        }
    }
</script>