<template>
	<div>
		<ul class="pagination">
			<li class="page-item" :class="{'disabled' : !paginationData.has_pre}">
				<a class="page-link" href="#" aria-label="Previous" 
					@click.prevent="emitPagination(paginationData.current_page - 1)">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li class="page-item" 
				:class="{'active' : paginationData.current_page === page}"
				v-for="page in paginationData.total_pages" :key="page">
				<a class="page-link" href="#" @click.prevent="emitPagination(page)">{{page}}</a>
				</li>
			<li class="page-item" :class="{'disabled' : !paginationData.has_next}">
				<a class="page-link" href="#" aria-label="Next"
					@click.prevent="emitPagination(paginationData.current_page + 1)">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	props: {
		paginationData: {
			type: Object,
		},
	},

	methods:{
		emitPagination(page){
			this.$emit('emitpage',page)
		}
	},

}
</script>