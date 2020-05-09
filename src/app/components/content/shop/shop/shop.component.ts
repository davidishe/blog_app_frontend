import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/services/products/shop.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { TypesService } from 'src/app/services/products/types.service';
import { RegionsService } from 'src/app/services/products/regions.service';
import { IProductType } from 'src/app/shared/models/type';
import { IProductRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit, OnDestroy {

  products: IProduct[];
  types: IProductType[];
  regions: IProductRegion[];
  shopParams = new ShopParams();
  totalCount: number;
  pageSizeOptions: number[] = [this.shopParams.pageSize, 10];
  sub: Subscription;

  @ViewChild('search', {static: false}) searchTerm: ElementRef;

  constructor(
    private shopService: ShopService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    public busyService: BusyService,
    private basketService: BasketService

  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getAllProducts();
    this.getAllRegions();
    this.getAllTypes();

    // page index actions in paginator
    this.paginator.page.subscribe(() => {
      this.shopParams.pageNumber = this.paginator.pageIndex + 1;
      this.shopParams.pageSize = this.paginator.pageSize;
      this.getAllProducts();
    });

  }

  getAllProducts() {
    this.sub = this.shopService.GetAllProducts(this.shopParams).subscribe((response: IPagination) => {
      this.products = response.data;
      this.totalCount = response.count;
      this.shopParams.pageNumber = response.pageIndex;
      this.paginator.pageSizeOptions = this.pageSizeOptions;
      this.paginator.pageSize = this.shopParams.pageSize;

    }, error => {
      console.log(error);
    });
  }

  onRegionSelected(regionId: number) {
    if (regionId !== this.shopParams.regionIdSelected) {
      this.shopParams.regionIdSelected = regionId;
      this.shopParams.pageNumber = 1;
      this.getAllProducts();
    } else {
      this.shopParams.regionIdSelected = 0;
      this.shopParams.pageNumber = 1;
      this.getAllProducts();
    }
  }

  onTypeSelected(typeId: number) {
    if (typeId !== this.shopParams.typeIdSelected) {
      this.shopParams.typeIdSelected = typeId;
      this.getAllProducts();
    } else {
      this.shopParams.typeIdSelected = 0;
      this.shopParams.pageNumber = 1;
      this.getAllProducts();
    }
  }

  onSortSelected(sort: string) {
    this.shopParams.sortSelected = sort;
    this.shopParams.pageNumber = 1;
    this.getAllProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getAllProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.shopParams = new ShopParams();
    this.getAllProducts();
  }

  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addItemToBasket(product: any) {
    this.basketService.addItemToBasket(product, 1);
  }
}
