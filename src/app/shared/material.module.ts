import { NgModule } from '@angular/core';
import { MatButtonToggleModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule, MatDividerModule, MatRadioModule, MatAutocompleteModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, MatBadgeModule, MatNativeDateModule, MatInputModule, MatStepperModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatSidenav, MatSidenavContent, MatNavList, MatSidenavContainer, MatMenuModule, MatTableDataSource, MatTableModule, MatSortModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  BrowserAnimationsModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})

export class MaterialModule {}
