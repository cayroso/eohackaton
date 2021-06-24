
<script>
    'use strict';
    import appMixin from '../../../_Core/Mixins/appMixin';
    //import SystemBar from './system-bar.vue';
    import AppBar from './app-bar.vue';
    //import NavDrawer from './nav-drawer.vue';
    //import AppFooter from './footer.vue';
    //import BottomNav from './bottom-nav.vue';

    import Index from '../index.vue';

    export default {
        template: '#app',
        mixins: [appMixin],
        components: {
            //SystemBar,
            AppBar,
            //NavDrawer, //AppFooter,
            //BottomNav,

            Index,
        },
        props: { 
            appName: { type: String, required: true },
            urlProfilePicture: String
        },
        data() {
            return {
                menus: [
                    { to: '/', label: 'Home', icon: '' },
                    { to: '/about', label: 'About', icon: '' },
                    { to: '/contact-us', label: 'Contact Us', icon: '' },
                    { to: '/terms-of-use', label: 'Terms of Use', icon: '' },
                    { to: '/privacy-policy', label: 'Privacy Policy', icon: '' },                    
                ],
                bottomNavHeightStyle: null,
                items: [],
            }
        },
        async mounted() {

        },
        async created() {
            
        },
        methods: {

        }
    }
</script>
