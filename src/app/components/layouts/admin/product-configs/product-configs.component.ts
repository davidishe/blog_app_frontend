import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TypesService } from 'src/app/services/products/types.service';
import { RegionsService } from 'src/app/services/products/regions.service';
import { IProductRegion } from 'src/app/shared/models/region';
import { IProductType } from 'src/app/shared/models/type';

@Component({
  selector: 'app-product-configs',
  templateUrl: './product-configs.component.html',
  styleUrls: ['./product-configs.component.scss']
})
export class ProductConfigsComponent implements OnInit {

  panelOpenState = false;
  formLandingTypes: FormGroup;
  type: IProductType;
  types: IProductType[];

  formLandingRegions: FormGroup;
  region: IProductRegion;
  regions: IProductRegion[];

  displayedColumns: string[] = ['productTitle', 'productImage', 'productPrice', 'enrolledDate', 'guId', 'tableOperations'];
  dataSource: any;

  constructor(
    private typesService: TypesService,
    private regionsService: RegionsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fnFormInit();
    this.GetAllTypes();
    this.GetAllRegions();
  }

  GetAllTypes() {
    this.typesService.GetAllTypes().subscribe(response => {
      this.types = response;
    });
  }

  GetAllRegions() {
    this.regionsService.GetAllRegions().subscribe(response => {
      this.regions = response;
    });
  }

  fnFormInit() {
    this.formLandingTypes = new FormGroup({
      name: new FormControl(null),
    });

    this.formLandingRegions = new FormGroup({
      name: new FormControl(null),
    });
  }

  fnDeleteItem(ProductTypeId: any) {
    this.typesService.Delete(ProductTypeId).subscribe(response => {
      console.log(response);
      this.types = response as IProductType[];
    });
  }

  addType() {
    if (this.formLandingTypes.invalid) {
      console.log(this.formLandingTypes.controls.name.errors);
      return;
    } else {
      this.type = {
        name: this.formLandingTypes.controls.name.value
      };

      this.typesService.Create(this.type).subscribe((response) => {
        this.openSnackBar('🤗 запись добавлена');
        this.types = response as IProductType[];

      }, error => {
        console.log(error);
      });
      this.openSnackBar('🙁 что-то пошло не так!');

    }
  }


  addRegion() {
    if (this.formLandingRegions.invalid) {
      console.log(this.formLandingRegions.controls.name.errors);
      return;
    } else {
      this.type = {
        name: this.formLandingRegions.controls.name.value
      };

      this.regionsService.Create(this.type).subscribe((response) => {
        this.openSnackBar('🤗 запись добавлена');
        this.types = response as IProductRegion[];

      }, error => {
        console.log(error);
      });
      this.openSnackBar('🙁 что-то пошло не так!');

    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}
