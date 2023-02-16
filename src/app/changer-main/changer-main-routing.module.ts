import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { PartnersPageComponent } from './partners-page/partners-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'Home'},
  {path: '', component: MainPageComponent,
  children: [
    {path: 'Home', component: HomePageComponent},
    {path: 'Rules', component: RulesPageComponent},
    {path: 'Partners', component: PartnersPageComponent},
    {path: 'Contacts', component: ContactsPageComponent},
    {path: 'News', component: NewsPageComponent},
    {path: 'Payment', component: PaymentComponent}
  ]
},
  {path: 'Home', component: HomePageComponent}
];

@NgModule({
  imports: [
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangerMainRoutingModule { }
