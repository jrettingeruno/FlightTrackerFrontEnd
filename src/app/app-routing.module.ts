import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AddNoFlyZoneComponent } from './add-no-fly-zone/add-no-fly-zone/add-no-fly-zone.component';
import { CesiumComponentComponent } from './cesium-component/cesium-component.component';
import { FlightSearchComponent } from './flight-search/flight-search/flight-search.component';
import { HomeComponent } from './home/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'search', component: FlightSearchComponent, title: 'Flight Search' },
  { path: 'add-no-fly-zone', component: AddNoFlyZoneComponent, title: 'No Fly Zone' },
  { path: 'track/:id', component: CesiumComponentComponent, title: 'Flight Tracker' },
  { path: '**', component: PageNotFoundComponent, title: 'Oops! Page not found!' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
