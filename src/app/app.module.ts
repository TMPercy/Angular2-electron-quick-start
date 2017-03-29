// import redux dev-tool
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Setup redux with ngrx
import { Store, StoreModule } from '@ngrx/store';
import { AppStore, InitialState } from './reducers';

/**
 * Import our ui components
 */
import { ActionButtonComponent } from './ui-components/action-button/action-button.component';
import { DragPaneComponent } from './ui-components/drag-pane/drag-pane.component';
import { PreloaderComponent } from './ui-components/preloader/preloader.component';
import { UrlInputComponent } from './ui-components/url-input/url-input.component';
import { TabsComponent } from './ui-components/tabs/tabs.component';
import { TabComponent } from './ui-components/tabs/tab.component';
import { TabTitleDirective } from './ui-components/tabs/tab-title.directive';
import { TabContentDirective } from './ui-components/tabs/tab-content.directive';

/**
 * Import our child components
 */
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestBodyComponent } from './components/request-body/request-body.component';
import { RequestHeaderComponent } from './components/request-header/request-header.component';
import { ResponsePaneComponent } from './components/response-pane/response-pane.component';
import { ResponseBodyComponent } from './components/response-body/response-body.component';
import { ResponseHeaderComponent } from './components/response-header/response-header.component';
import { PaneComponent } from './components/pane/pane.component';
import { HistoryComponent } from './components/history/history.component';
import { FormComponent } from './components/form/form.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { AppComponent } from './components/app.component';

/**
 *  Import our providers
 */
import { UIComponentConfig } from './ui-components/config';
import { LayoutService } from './services/layout.service';
import { LoadService } from './services/loader.service';
import { RequestService } from './services/request.service';
import { FromDataControlService } from './services/formdata.service';

/**
 * Import material UI Components
 */
// import { MaterialModule } from '@angular/material';

import { routes } from './app.routes';

/**
 * Import the authentication service to be injected into our component
 */

/*
 * provide('AppStore', { useValue: appStore }),
 */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // MaterialModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true }),
        StoreModule.provideStore({
            AppStore
        }),
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    providers: [UIComponentConfig, LayoutService, LoadService, RequestService, FromDataControlService],
    declarations: [
        //ui-components
        ActionButtonComponent,
        DragPaneComponent,
        PreloaderComponent,
        UrlInputComponent,
        TabComponent,
        TabsComponent,
        TabTitleDirective,
        TabContentDirective,
        //custom-components
        AppComponent,
        HomeComponent,
        NavbarComponent,
        RequestHeaderComponent,
        RequestBodyComponent,
        ResponsePaneComponent,
        ResponseBodyComponent,
        ResponseHeaderComponent,
        PaneComponent,
        HistoryComponent,
        FormComponent,
        FormItemComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
