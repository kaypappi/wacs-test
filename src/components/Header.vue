<template>
    <nav>
        <ul>
            <li class="page-title">{{title}}</li>
            <li>{{entityName}}</li>
            <li v-if="userName"><img src="/assets/images/notification-icon.svg" alt="bell"></li>
            <li v-if="userName">
                {{userName}}
            </li>
            <Dropdown 
                iconName="sprite.svg#carret-arrow"
                :options="[
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: ()=>'',
                    }, 
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: ()=>'',
                    }, 
                ]"
            />
        </ul>
        
    </nav>
</template>

<script>
    import Dropdown from './Dropdown/Dropdown';
    export default {
        components: {
            Dropdown,
        },
        props: {
           'title': String,
           'entityName': String,
           'userName': String,
        }
    }
</script>
