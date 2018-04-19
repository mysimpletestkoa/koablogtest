import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/index';
import { PostDetailComponent } from './postDetail/index';

const appRoutes: Routes = [
    { path: '', component: PostComponent },
    { path: 'postdetail/:id', component: PostDetailComponent  },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });