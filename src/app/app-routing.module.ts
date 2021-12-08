import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {PhotoComponent} from "./photo/photo.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SavedCardComponent} from "./saved-card/saved-card.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'photo/:id', component: PhotoComponent},
  { path: 'saved-cards', component: SavedCardComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
