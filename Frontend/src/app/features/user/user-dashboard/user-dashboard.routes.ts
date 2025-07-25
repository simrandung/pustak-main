import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserCartComponent } from '../user-cart/user-cart.component';

export const USER_ROUTES: Routes =[
    {
        path:'',
        component: UserDashboardComponent
    },
    {
        path:'cart',
        component:UserCartComponent

    }
]