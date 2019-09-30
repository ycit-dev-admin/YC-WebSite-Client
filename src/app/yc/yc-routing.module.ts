import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YcAppComponent } from './yc-app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { RequireAuthenticatedUserRouteGuard } from '../shared/oidc/require-authenticated-user-route.guard';
import { WritePostComponent } from './components/write-post/write-post.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { PosProduceProcessComponent } from './components/pos-produce-process/pos-produce-process.component';
import { PosPurchaseComponent } from './components/pos-purchase/pos-purchase.component';
import { CreateWeightnoteComponent } from './components/create-weightnote/create-weightnote.component';

const routes: Routes = [
  {
    path: '', component: YcAppComponent,
    children: [
      { path: 'post-list', component: PostListComponent, canActivate: [RequireAuthenticatedUserRouteGuard] },
      { path: 'post-table', component: PostTableComponent },
      { path: 'pos-produce-process', component: PosProduceProcessComponent },
      { path: 'pos-purchase', component: PosPurchaseComponent },
      {
        path: 'write-post', component: WritePostComponent,
        canActivate: [RequireAuthenticatedUserRouteGuard]
      },
      {
        path: 'create-weightnote', component: CreateWeightnoteComponent,
        canActivate: [RequireAuthenticatedUserRouteGuard]
      },
      { path: '**', redirectTo: 'post-list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YcRoutingModule { }
