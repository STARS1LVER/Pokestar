import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path:'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'list-pokemon',
        title: 'List Pokemon',
        loadComponent: () => import('./dashboard/pages/list-pokemon/list-pokemon.component')
      },
      {
        path:  'search-pokemon',
        title: 'Search Pokemon',
        loadComponent: () => import('./dashboard/pages/search-pokemon/search-pokemon.component')
      },
      {
        path: 'info-pokemon/:id',
        title: 'Title Info Pokemon',
        loadComponent: () => import('./dashboard/pages/info-pokemon/info-pokemon.component')
      },
      {
        path: '',
        redirectTo: 'list-pokemon',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }


];
