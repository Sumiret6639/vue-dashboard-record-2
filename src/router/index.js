import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/dashboard'
import SignIn from '@/components/pages/signin'
import Products from '@/components/pages/product'
import Coupons from '@/components/pages/coupons'
import CustomerOrder from '@/components/pages/orders'
// import IsPaid from '@/components/pages/isPaid'
import OrdersList from '@/components/pages/ordersList'
import CheckOut from '@/components/pages/checkOut'
import Index from '@/components/index'
import IndexContent from '@/components/indexContent'
import AllProducts from '@/components/allProducts'
import Arranged from '@/components/arranged'
import FAQ from '@/components/FAQ'
import ItemDetail from '@/components/ItemDetailPage'
import CustomCheckOut from '@/components/cusomerCheckOut'
import CustomInform from '@/components/customerInform'
import CustomOrder from '@/components/customerOrder'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '*',
			redirect: '/home'
		},
		{
			path: '/',
			name: '首頁',
			component: Index,
			redirect: '/home',
			children: [

				{
					path: 'home',
					name: '首頁頁面',
					component: IndexContent,
				},

				{
					path: 'allProducts',
					name: '使用者商品頁面',
					component: AllProducts,
				},

				{
					path: 'arranged',
					name: '商品分類頁面',
					component: Arranged,
				},

				{
					path: 'product/:itemId',
					name: '商品個別頁',
					component: ItemDetail,
				},

				{
					path: 'FAQ',
					name: '購物須知頁',
					component: FAQ,
				},

				{
					path: 'custom_checkout',
					name: '顧客結帳頁面',
					component: CustomCheckOut,
				},

				{
					path: 'custom_Inform',
					name: '顧客資料頁面',
					component: CustomInform,
				},

				{
					path: 'custom_orders/:orderId',
					name: '購買確認頁面',
					component: CustomOrder,
				},
				
			]
		},
		{
			path: '/login',
			name: '登入頁面',
			component: SignIn,   
		},
		{
			path: '/_admin',
			name: '使用者面板',
			component: Dashboard,
			children: [
				{
					path: 'products',
					name: '商品頁面',
					component: Products,
					meta: {requiresAuth: true},
				},
				{
					path: 'coupons',
					name: '優惠券頁面',
					component: Coupons,
					// meta: { requiresAuth: true },
				},
				{
					path: 'orderslist',
					name: '訂單管理頁面',
					component: OrdersList,
					// meta: { requiresAuth: true },
				},
			]
		},

		{
			path: '/_admin',
			name: 'Dashboard',
			component: Dashboard,
			children: [
				{
					path: 'customer_order',
					name: 'customer_order',
					component: CustomerOrder,
				},
				{
					path: 'checkout/:orderId',
					name: 'checkout',
					component: CheckOut,
				},
			]
		},
	]
})
