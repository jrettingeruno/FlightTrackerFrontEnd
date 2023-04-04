import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumComponentComponent } from './cesium-component/cesium-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button' 
import { MatToolbarModule } from '@angular/material/toolbar' 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home/home.component';
import { FlightSearchComponent } from './flight-search/flight-search/flight-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { AddNoFlyZoneComponent } from './add-no-fly-zone/add-no-fly-zone/add-no-fly-zone.component'
import { FormsModule } from '@angular/forms';
import { FlightTrackingPageComponent } from './flight-tracking-page/flight-tracking-page/flight-tracking-page.component';
import { FlightDetailsComponent } from './flight-details/flight-details/flight-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RectangleNoFlyZoneComponent } from './no-fly-zone-types/rectangle-no-fly-zone/rectangle-no-fly-zone/rectangle-no-fly-zone.component';
import { EllipsoidNoFlyZoneComponent } from './no-fly-zone-types/ellipsoid-no-fly-zone/ellipsoid-no-fly-zone/ellipsoid-no-fly-zone.component';
import { CustomPolygonNoFlyZoneComponent } from './no-fly-zone-types/custom-polygon-no-fly-zone/custom-polygon-no-fly-zone/custom-polygon-no-fly-zone.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CesiumComponentComponent,
    HomeComponent,
    FlightSearchComponent,
    PageNotFoundComponent,
    AddNoFlyZoneComponent,
    FlightTrackingPageComponent,
    FlightDetailsComponent,
    RectangleNoFlyZoneComponent,
    EllipsoidNoFlyZoneComponent,
    CustomPolygonNoFlyZoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
