import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SearchbarComponent} from "./components/searchbar/searchbar.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {SignupComponent} from "./pages/auth/signup/signup.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AddListingComponent} from "./pages/add-listing/add-listing.component";
import {ListingDetailsComponent} from "./pages/listing-details/listing-details.component";
import {ListingResolver} from "./utils/product.resolver";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'listings/:categorySlug/:listingId', component: ListingDetailsComponent, resolve: {listing: ListingResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
