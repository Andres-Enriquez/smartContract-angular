import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtraccionComponent } from './components/atraccion/atraccion.component';
import { AdministradorComponent } from './components/administrador/administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    AtraccionComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
