import { NgModule } from '@angular/core';
import { MatIconModule, MatToolbarModule, MatDividerModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, MatBadgeModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatTableModule, MatSortModule, MatListModule, MatPaginatorModule, MatTabsModule, MatChipsModule, MatProgressBarModule, MatExpansionModule, MatButtonToggleModule, MatStepperModule, MatRadioModule
} from '@angular/material';
import { CdkStepperModule } from '@angular/cdk/stepper';


const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTabsModule,
  MatChipsModule,
  MatProgressBarModule,
  MatExpansionModule,
  CdkStepperModule,
  MatStepperModule,
  MatRadioModule
];

@NgModule({
   imports: [
      MaterialComponents
   ],
   exports: [
      MaterialComponents
   ],
   declarations: [
   ]
})

export class MaterialModule {}
