import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { AcademiaComponent } from './academia.component/academia.component';
import { UsuarioComponent } from './usuario.component/usuario.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'academia', component: AcademiaComponent },
    { path: 'usuario', component: UsuarioComponent },

    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }