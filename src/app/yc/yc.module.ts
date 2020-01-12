import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { YcRoutingModule } from './yc-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { YcAppComponent } from './yc-app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostService } from './services/post.service';
import { AuthorizationHeaderInterceptor } from '../shared/oidc/authorization-header-interceptor.interceptor';
import { PostCardComponent } from './components/post-card/post-card.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TinymceService } from './services/tinymce.service';
import { EnsureAcceptHeaderInterceptor } from '../shared/ensure-accept-header.interceptor';
import { HandleHttpErrorInterceptor } from '../shared/handle-http-error-interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostTableComponent } from './components/post-table/post-table.component';
import { PosProduceProcessComponent } from './components/pos-produce-process/pos-produce-process.component';
import { PosPurchaseComponent } from './components/pos-purchase/pos-purchase.component';
import { WeightnoteCardComponent } from './components/weightnote-card/weightnote-card.component';
import { WeightNoteinfoDialogComponent } from './components/weightnoteinfo-dialog/weightnoteinfo-dialog.component';
import { CreateWeightnoteComponent } from './components/create-weightnote/create-weightnote.component';
import { WeightNoteService } from './services/weightnote.service';
import { ProcurementProcessComponent } from './components/procurement-process/procurement-process.component';
import { ProcurementCheckModule } from './modules/procurement-check/procurement-check.module';
import { ProcurementWeightModule } from './modules/procurement-weight/procurement-weight.module';
import { ProcurementPayModule } from './modules/procurement-pay/procurement-pay.module';
import { ProductItemService } from './services/product-item.service';

@NgModule({
  imports: [
    CommonModule,
    YcRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    InfiniteScrollModule,
    ProcurementCheckModule,
    ProcurementWeightModule,
    ProcurementPayModule
  ],
  declarations: [
    YcAppComponent,
    SidenavComponent,
    ToolbarComponent,
    PostListComponent,
    PostCardComponent,
    WritePostComponent,
    PostTableComponent,
    PosProduceProcessComponent,
    PosPurchaseComponent,
    WeightnoteCardComponent,
    WeightNoteinfoDialogComponent,
    CreateWeightnoteComponent,
    ProcurementProcessComponent
  ],
  providers: [
    PostService,
    TinymceService,
    WeightNoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
    ProductItemService
  ],
  entryComponents: [WeightNoteinfoDialogComponent]
})
export class YcModule { }
