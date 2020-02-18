<template>
    <div class="table-container">
        <!-- <table class="table">
            <thead>
                <tr>
                    <th v-for="(title, index) in tableHeaders" :key="index">{{title}}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table> -->
        <table class="table personal-info-table no-border-table">
            <tr>
                <td>
                    <span class="t-field">Ippiss Number</span>
                    <span class="t-value">0124440</span>
                </td>
                <td>
                    <span class="t-field">Phone Number</span>
                    <span class="t-value">08034567823</span>
                </td>
                <td>
                    <span class="t-field">Marital Status</span>
                    <span class="t-value">Married</span>
                </td>
                <td>
                    <span class="t-field">Monthly Salary</span>
                    <span class="t-value">250,000.00</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="t-field">MDA</span>
                    <span class="t-value">Ministry Of Education</span>
                </td>
                <td>
                    <span class="t-field">Gender</span>
                    <span class="t-value">Male</span>
                </td>
                <td>
                    <span class="t-field">BVN</span>
                    <span class="t-value">3210340566</span>
                </td>
                <td>
                    <span class="t-field">Email</span>
                    <span class="t-value">helenmustapha@xwzy.com</span>
                        </td>
            </tr>
            <tr>
                <td>
                    <span class="t-field">Religion</span>
                    <span class="t-value">None</span>
                </td>
                <td>
                    <span class="t-field">State Of Origin</span>
                    <span class="t-value">Kogi</span>
                </td>
                <td>
                    <span class="t-field">Nationality</span>
                    <span class="t-value">Nigerian</span>
                </td>
                <td>
                    <span class="t-field">Address</span>
                    <span class="t-value">3, Ogunshipe Crescent, Obalende, Lagos</span>
                </td>
            </tr>
        </table>
    </div>  
</template>

<script>
    export default {
        props: {
            'tableHeaders': Array,
        },
    }
</script>
