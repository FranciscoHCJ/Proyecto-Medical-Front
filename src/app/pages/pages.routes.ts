import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalComponent } from './hospitales/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { InformacionComponent } from './informacion/informacion.component';
import { FarmaciasComponent } from './farmacias/farmacia.component';

const pagesRoutes: Routes = [
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
            {
                path: 'dashboard', component: DashboardComponent,
                canActivate: [AdminGuard],
                data: { titulo: 'Panel de Control' },
            },
            { path: 'informacion', component: InformacionComponent, data: { titulo: 'Informacion' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
            // Mantenimientos
            {
                path: 'usuarios', component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Usuarios' }
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Unidades Médicas' } },
            { path: 'hospital/:tipo', component: HospitalComponent, data: { titulo: 'Crear Nueva Unidad Médica' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
            {
                path: 'especialidades', component: EspecialidadesComponent,
                canActivate: [ AdminGuard],
                data: { titulo: 'Mantenimiento de Especialidades' }
            },
            { path: 'farmacias', component: FarmaciasComponent, data: { titulo: 'Mantenimiento de Farmacias' } },
            { path: '', redirectTo: '/perfil', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
