import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { AtraccionComponent } from './components/atraccion/atraccion.component';

const routes: Routes = [
  { path: '', redirectTo: '/atracciones', pathMatch: 'full' },
  { path: 'atracciones', component: AtraccionComponent },
  { path: 'admin', component: AdministradorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
