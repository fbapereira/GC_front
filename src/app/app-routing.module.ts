import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { AcademiaComponent } from './academia.component/academia.component';
import { UsuarioComponent } from './usuario.component/usuario.component';
import { ForgetPasswordComponent } from './forget-password.component/forget-password.component';
import { MeusDadosComponent } from './meus-dados.component/meus-dados.component';
import { MensalidadeComponent } from './mensalidade.component/mensalidade.component';
import { EmailComponent } from './email.component/email.component';
import { ResumoExternoComponent } from './resumo-externo.component/resumo-externo.component';
import { ModalidadeListComponent } from './modalidade-list.component/modalidade-list.component';
import { FaltasComponent } from './faltas.component/faltas.component';
import { AulasComponent } from './aulas.component/aulas.component';
import { EuComponent } from './eu.component/eu.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'eu/:cpf/:id', component: EuComponent },
  { path: 'eu/:cpf/', component: EuComponent },
  { path: 'eu', component: EuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'external', component: ResumoExternoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'academia', component: AcademiaComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'meus-dados', component: MeusDadosComponent },
  { path: 'mensalidade', component: MensalidadeComponent },
  { path: 'email', component: EmailComponent },
  { path: 'modalidade', component: ModalidadeListComponent },
  { path: 'faltas', component: FaltasComponent },
  { path: 'aulas', component: AulasComponent },
  { path: '*', redirectTo: '', },
  { path: '**', redirectTo: '', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
