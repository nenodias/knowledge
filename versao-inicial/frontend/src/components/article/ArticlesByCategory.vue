<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/global';
import PageTitle from '../templates/PageTitle';

export default {
    name: 'ArtivlesByCategory',
    components: {
        PageTitle
    },
    data(){
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`;
            axios.get(url)
                .then(res => this.category = res.data)
                .catch(showError);
        }
    },
    mounted() {
        this.category.id = this.$route.params.id;
        this.getCategory();
    }
}
</script>

<style>

</style>
