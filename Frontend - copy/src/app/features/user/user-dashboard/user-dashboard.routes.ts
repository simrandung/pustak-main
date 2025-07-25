import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';

import { UserWishlistComponent } from '../user-wishlist/user-wishlist.component';

export const USER_ROUTES: Routes =[
    {
        path:'',
        component: UserDashboardComponent
    },
    {
        path:'cart',
        loadComponent:() => import('../user-cart/user-cart.component').then(m => m.UserCartComponent)

    },
    {
        path:'wishlist',
        component:UserWishlistComponent
    }
]