
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PipeModulo
import { PipesModule } from '../pipes/pipes.module';

// temporal
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalComponent } from './hospitales/hospital.component';
import { InformacionComponent } from './informacion/informacion.component';
import { FarmaciasComponent } from './farmacias/farmacia.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AccoutSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,
        HospitalComponent,
        MedicoComponent,
        MedicosComponent,
        FarmaciasComponent,
        EspecialidadesComponent,
        BusquedaComponent,
        InformacionComponent,
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule
    ]
})
export class PagesModule { }
