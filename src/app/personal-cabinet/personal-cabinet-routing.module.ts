import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeWalletComponent } from './change-wallet/change-wallet.component';
import { MainComponent } from './main/main.component';
import { ManageComponent } from './manage/manage.component';
import { RefComponent } from './ref/ref.component';

const routes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'Account'},
  {path: 'Account', component: MainComponent, children: [
    {path: 'Manage', component: ManageComponent},
    {path: 'Ref', component: RefComponent},
    {path: 'ChangePassword', component: ChangePasswordComponent},
    {path: 'ChangeWallet', component: ChangeWalletComponent},
    {path: 'AdminPanel', component: AdminPanelComponent}
  ]}

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCabinetRoutingModule { }
