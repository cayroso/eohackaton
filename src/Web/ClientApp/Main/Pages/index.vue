<style>
</style>
<template>
    <div v-cloak>
        <div>
            <b-select :options="styles" @change="styleChanged"></b-select>
        </div>
        <div id="mapContainer" class="basemap w-100 min-vh-100">test</div>
    </div>
</template>
<script>

    //import page from '../../_Core/Mixins/pageMixin';
    import mapboxgl from "mapbox-gl";

    export default {
        mixins: [
            //page
        ],
        components: {

        },
        props: {

        },
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiY2F5ZGV2MjAxMCIsImEiOiJja3FiOGphZ3ExN2Y4Mndtdmp0NzR6dTc5In0.u97hhxcg2FKUZwbXIYRfDg',
                map: null
            };
        },
        computed: {
            styles() {
                const list = [
                    { value: 'mapbox://styles/mapbox/streets-v11', text: 'Streets' },
                    { value: 'mapbox://styles/mapbox/outdoors-v11', text: 'Outdoors' },
                    { value: 'mapbox://styles/mapbox/light-v10', text: 'Light' },
                    { value: 'mapbox://styles/mapbox/dark-v10', text: 'Dark' },
                    { value: 'mapbox://styles/mapbox/satellite-v9', text: 'Satellite' },
                    { value: 'mapbox://styles/mapbox/satellite-streets-v11', text: 'Satellite Streets' },
                    { value: 'mapbox://styles/mapbox/navigation-day-v1', text: 'Navigation Day' },
                    { value: 'mapbox://styles/mapbox/navigation-night-v1', text: 'Navigation Night' },
                ];

                return list;
            }
        },
        async mounted() {
            const vm = this;

            const cache = JSON.parse(localStorage.getItem(vm.dashboardKey)) || {};

            mapboxgl.accessToken = vm.accessToken;

            vm.map = new mapboxgl.Map({
                container: "mapContainer",
                //style: "mapbox://styles/mapbox/streets-v11",
                //style: 'mapbox://styles/mapbox/satellite-streets-v10',
                //style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
                center: [103.811279, 1.345399],
                zoom: 14,
                //maxBounds: [
                //    [103.6, 1.1704753],
                //    [104.1, 1.4754753],
                //],
            });

            const nav = new mapboxgl.NavigationControl();
            vm.map.addControl(nav, "top-right");

            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });

            vm.map.addControl(geolocate, "top-right");

            vm.map.setStyle(vm.styles[0].value);


            const marker = new mapboxgl.Marker()
                .setLngLat([103.811279, 1.345399])
                .addTo(vm.map);
        },
        async created() {
            const vm = this;

            const cache = vm.$util.getWithExpiry(vm.feedbackCache);

            //if (cache)
            //    vm.showFeedback = false;

        },

        methods: {
            styleChanged(style) {
                const vm = this;

                vm.map.setStyle(style);
            }
        }
    }
</script>