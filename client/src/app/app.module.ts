import { NgModule }       from '@angular/core';
import { LOCALE_ID }      from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import {Ng2Webstorage}    from 'ngx-webstorage';

import { AppComponent }   from './app.component';
import { routing }           from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent }     from './_directives/index';
import {
    MenuService,
    AlertService,
    PostService,
    CommentService } from './_services/index';
import { PostComponent } from './post/index';
import { PostDetailComponent } from './postDetail/index';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        PostComponent,
        PostDetailComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "ru-RU" },
        customHttpProvider,
        MenuService,
        AlertService,
        PostService,
        CommentService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
