import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./changer-main/changer-main.module').then(m => m.ChangerMainModule)
  },
  {
    path: 'Identity',
    loadChildren: () => import('./personal-cabinet/personal-cabinet.module').then(m => m.PersonalCabinetModule)
  },
  {path: '**', redirectTo: ''}
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
