import { Injector } from '@angular/core';
import { AppInjector } from '@app/core/services/app-injector.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@app/core/http/token.interceptor';

import { WinAuthInterceptor } from '@app/core/http/win-auth-interceptor';

import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastService } from './shared/services/toast.service';
import { ModalService } from './shared/services/modal.service';
import { CommonService } from './shared/services/common.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UpdateSwToastComponent } from './service/update-sw-toast/update-sw-toast.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PrismModule } from '@app/prism/prism.module';
import { CustomNgbDateAdapter } from '@app/shared/services/custom-ngb-date-adapter';
import { CustomNgbDateParserFormatter } from '@app/shared/services/custom-ngb-date-parser-formatter';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NotReadyComponent } from './common/not-ready/not-ready.component';
import { SplashComponent } from './common/splash/splash.component';
import { StudyIconNumbersResolver } from '@app/prism/resolvers/study-icon-number-resolver';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    //ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    // NgxPermissionsModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    LoginModule,
    AppRoutingModule,
    FileUploadModule,

    PrismModule

    // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, NoaccessComponent, ErrorPageComponent, UpdateSwToastComponent, NotReadyComponent, SplashComponent],
  providers: [
    DecimalPipe,
    ToastService,
    ModalService,
    CommonService,
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter },
    StudyIconNumbersResolver

    //devp:
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // //prod:
    // { provide: HTTP_INTERCEPTORS, useClass: WinAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
