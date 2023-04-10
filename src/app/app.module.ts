import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HeaderModule } from './header/header.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './state/app/app.reducers';
import { CharactersEffects } from './state/characters/characters.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/assets/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  CHARACTERS_API_BASE_URL,
  CharactersApiService,
} from './services/characters-api.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([CharactersEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    CharactersApiService,
    {
      provide: CHARACTERS_API_BASE_URL,
      useValue: environment.apiUrls.characters,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
