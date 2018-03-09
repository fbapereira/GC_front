import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { AcademiaComponent } from './academia.component/academia.component';
import { UsuarioComponent } from './usuario.component/usuario.component';
import { ForgetPasswordComponent } from './forget-password.component/forget-password.component';
import { MeusDadosComponent } from './meus-dados.component/meus-dados.component';
import { MensalidadeComponent } from './mensalidade.component/mensalidade.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'academia', component: AcademiaComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'forget-password', component: ForgetPasswordComponent },
    { path: 'meus-dados', component: MeusDadosComponent },
    { path: 'mensalidade', component: MensalidadeComponent },

    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }