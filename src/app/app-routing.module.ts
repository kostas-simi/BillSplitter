import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'items', loadChildren: './items/items.module#ItemsPageModule' },
  { path: 'people', loadChildren: './people/people.module#PeoplePageModule' },
  { path: 'add-edit-item', loadChildren: './add-edit-item/add-edit-item.module#AddEditItemPageModule' },
  { path: 'add-edit-person', loadChildren: './add-edit-person/add-edit-person.module#AddEditPersonPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }