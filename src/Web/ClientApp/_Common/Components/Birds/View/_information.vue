<template>
    <div v-cloak>
        <b-overlay :show="busy">
            <div v-observe-visibility="{callback: get, once: true}">
                <div class="row no-gutters">
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Name</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{item.name}}
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Type</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{item.categoryText}} {{item.genderText}}
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Bloodlines</label>
                            <div class="col">
                                <div class="form-control-plaintext">
                                    <ul class="list-unstyled mb-0">
                                        <li v-for="b in item.bloodlines">

                                            <span class="mr-1">
                                                <span v-if="b.percentage===1">Full</span>
                                                <span v-else>{{b.percentage|decimalToFraction}}</span> {{b.name}}
                                            </span>
                                            <span>{{b.genderText}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Birth Date</label>
                            <div class="col">
                                <span class="form-control-plaintext">{{item.dateStart|moment('calendar')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">

                        <div v-if="item.dead" class="form-group row">
                            <label class="col-4 text-right col-form-label">Death Date</label>
                            <div class="col">
                                <span class="form-control-plaintext">{{item.dateEnd|moment('calendar')}}</span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Comb Type</label>
                            <div class="col">
                                <span class="form-control-plaintext">{{item.combTypeText}}</span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Feather Color</label>
                            <div class="col">
                                <span class="form-control-plaintext">{{item.featherColor}}</span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-4 text-right col-form-label">Leg Color</label>
                            <div class="col">
                                <span class="form-control-plaintext">{{item.legColor}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </b-overlay>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'


    export default {
        mixins: [
            page
        ],
        components: {

        },
        props: {            
            id: { type: String, required: true }
        },
        data() {
            return {
                item: {}
            };
        },
        computed: {

        },
        async created() {
            //await this.get();
        },
        async mounted() {

        },
        methods: {
            async get(visible) {

                if (visible === false) {
                    return
                }

                const vm = this;

                if (visible === true && vm.item.birdId) {
                    return;
                }

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/birds/${vm.id}`)
                        .then(resp => {
                            const data = resp.data;
                            const end = moment(data.dateEnd);

                            data.dead = moment().isAfter(end) > 0;


                            vm.item = data;
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

        }
    }
</script>