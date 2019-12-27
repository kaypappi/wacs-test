<template>
    <nav>
        <ul>
            <li class="page-title">{{title}}</li>
            <li>{{entityName}}</li>
            <li><img src="/assets/images/notification-icon.svg" alt="bell"></li>
            <li>
                <select name="" id="">
                    <option value="">{{userName}}</option>
                </select>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
       props: {
           'title': String,
           'entityName': String,
           'userName': String,
       }
    }
</script>
