import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { tokens } from './tokens/token';
import { RedComponent } from './red/red.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ListaService } from './services/lista.service';
import { RedService } from './services/red.service';

import { HttpInterceptorModule } from './services/HttpRequestInterceptor.module';


import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { HasClaimDirective } from './directives/has-claim.directive';



@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [HasClaimDirective]
})
export class MaterialModule {}






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //nuevo
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    
    //datatable
    DataTablesModule,
    

    // material
    MaterialModule,

    HttpInterceptorModule

  ],
  providers: [tokens,ListaService,RedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
