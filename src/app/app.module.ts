import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SearchbarComponent} from './components/searchbar/searchbar.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FooterComponent} from './components/footer/footer.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {LoginComponent} from './pages/auth/login/login.component';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ProfileComponent} from './pages/profile/profile.component';
import {NgOptimizedImage} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AddListingComponent} from './pages/add-listing/add-listing.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { ImageEditorDialogComponent } from './components/image-editor-dialog/image-editor-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';
import {ListingResolver} from "./utils/product.resolver";
import {PricePipe} from "./utils/price.pipe";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchbarComponent,
    FooterComponent,
    CategoriesComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AddListingComponent,
    ImageEditorDialogComponent,
    ListingDetailsComponent,
    PricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    NgOptimizedImage,
    MatSelectModule,
    MatSnackBarModule,
    ImageCropperModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule
  ],
  providers: [ListingResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
