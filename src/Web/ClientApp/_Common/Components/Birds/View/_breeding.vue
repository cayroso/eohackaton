<template>
    <div v-cloak>
        <b-overlay :show="busy">
            <div class="p-2 text-right">
                <button @click="get()" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
            </div>
            <div v-observe-visibility="{callback: get, once: true}">

                <table-list :header="{key:'breedingId', columns:[]}" :items="items" :getRowNumber="$util.noop2" :isSelected="$util.noop2" :setSelected="$util.noop">
                    <template #header>
                        <td>Date</td>
                        <td>Parents</td>
                        <td>Offspring</td>
                        <td></td>
                    </template>

                    <template slot="table" slot-scope="row">
                        <tr>
                            <td>
                                <div class="form-group mb-0 row no-gutters">
                                    <label class="col-3 col-form-label">Start</label>
                                    <div class="col">
                                        <span class="form-control-plaintext">
                                            {{row.item.dateStart|moment('calendar')}}
                                        </span>
                                    </div>
                                </div>
                                <div v-if="row.item.done" class="form-group mb-0 row no-gutters">
                                    <label class="col-3 col-form-label">Start</label>
                                    <div class="col">
                                        <span class="form-control-plaintext">
                                            {{row.item.dateEnd|moment('calendar')}}
                                        </span>
                                    </div>
                                </div>

                            </td>
                            <td>
                                <ul>
                                    <li v-for="p in row.item.parent">
                                        <span v-if="p.birdId === id">
                                            {{p.genderText}}: {{p.name}}
                                        </span>
                                        <a v-else :href="createViewLink(p.birdId)" class="d-block">
                                            {{p.genderText}}: {{p.name}}
                                        </a>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li v-for="p in row.item.children">
                                        <span v-if="p.birdId === id">
                                            {{p.genderText}}: {{p.name}}
                                        </span>
                                        <a v-else :href="createViewLink(p.birdId)" class="d-block">
                                            {{p.genderText}}: {{p.name}}
                                        </a>
                                    </li>
                                </ul>

                            </td>
                            <td>
                                <a :href="createViewBreedingLink(row.item.breedingId)" class="btn btn-primary">
                                    <span class="fas fa-fw fa-info-circle"></span>
                                </a>
                            </td>
                        </tr>
                    </template>

                    <template slot="list" slot-scope="row">
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Date</label>
                            <div class="col">
                                    <div class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Start</label>
                                        <div class="col">
                                            <span class="form-control-plaintext">
                                                {{row.item.dateStart|moment('calendar')}}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="row.item.done" class="form-group mb-0 row no-gutters">
                                        <label class="col-3 col-form-label">Start</label>
                                        <div class="col">
                                            <span class="form-control-plaintext">
                                                {{row.item.dateEnd|moment('calendar')}}
                                            </span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Parent</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    <ul>
                                        <li v-for="p in row.item.parent">
                                            <span v-if="p.birdId === id">
                                                {{p.genderText}}: {{p.name}}
                                            </span>
                                            <a v-else :href="createViewLink(p.birdId)" class="d-block">
                                                {{p.genderText}}: {{p.name}}
                                            </a>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Offspring</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    <ul>
                                        <li v-for="p in row.item.children">
                                            <span v-if="p.birdId === id">
                                                {{p.genderText}}: {{p.name}}
                                            </span>
                                            <a v-else :href="createViewLink(p.birdId)" class="d-block">
                                                {{p.genderText}}: {{p.name}}
                                            </a>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">View</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    <a :href="createViewBreedingLink(row.item.breedingId)" class="btn btn-primary">
                                        <span class="fas fa-fw fa-info-circle"></span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </template>
                </table-list>

            </div>
        </b-overlay>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'
    //import tableList from '../../../../_Core/Components/table-list.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            //tableList
        },
        props: {
            id: { type: String, required: true },
            urlView: { type: String, required: true },
            urlViewBreeding: { type: String, required: true },
        },
        data() {
            return {
                items: []
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

                    await vm.$util.axios.get(`api/birds/${vm.id}/breeding-history`)
                        .then(resp => {
                            const data = resp.data;

                            data.items.forEach(bh => {
                                const end = moment(bh.dateEnd);

                                bh.done = moment().isAfter(end);
                            });

                            vm.items = data.items;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            createViewBreedingLink(id) {
                const vm = this;
                const url = `${vm.urlViewBreeding}${id}`;
                return url;
            },


            createViewLink(id) {
                const vm = this;
                const url = `${vm.urlView}${id}`;
                return url;
            },

        }
    }
</script>