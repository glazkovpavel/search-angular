import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoComponent } from './photo/photo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SavedCardComponent } from './saved-card/saved-card.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CardComponent } from './card/card.component';
import { RxjsComponent } from './rxjs/rxjs/rxjs.component';
import { CreationOperatorsComponent } from './rxjs/creation-operators/creation-operators.component';
import { JoinCreationOperatorsComponent } from './rxjs/join-creation-operators/join-creation-operators.component';
import { TransformationOperatorsComponent } from './rxjs/transformation-operators/transformation-operators.component';
import { FilteringOperatorsComponent } from './rxjs/filtering-operators/filtering-operators.component';
import { JoinOperatorsComponent } from './rxjs/join-operators/join-operators.component';
import { MulticastingOperatorsComponent } from './rxjs/multicasting-operators/multicasting-operators.component';
import { UtilityOperatorsComponent } from './rxjs/utility-operators/utility-operators.component';
import { ConditionalAndBooleanOperatorsComponent } from './rxjs/conditional-and-boolean-operators/conditional-and-boolean-operators.component';
import { MathematicalAndAggregateOperatorsComponent } from './rxjs/mathematical-and-aggregate-operators/mathematical-and-aggregate-operators.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundComponent,
    PhotoComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SavedCardComponent,
    CardComponent,
    RxjsComponent,
    CreationOperatorsComponent,
    JoinCreationOperatorsComponent,
    TransformationOperatorsComponent,
    FilteringOperatorsComponent,
    JoinOperatorsComponent,
    MulticastingOperatorsComponent,
    UtilityOperatorsComponent,
    ConditionalAndBooleanOperatorsComponent,
    MathematicalAndAggregateOperatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule { }
// @ts-ignore
