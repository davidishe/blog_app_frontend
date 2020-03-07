import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemModel } from 'src/app/model/objects';
import { ItemsCrudService } from 'src/app/services/items-crud.service';
import { MatSnackBar } from '@angular/material';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-new-item-page',
  templateUrl: './new-item-page.component.html',
  styleUrls: ['./new-item-page.component.scss', '../items-page/items-page.component.scss']
})
export class NewItemPageComponent implements OnInit {

  ItemForm: FormGroup;
  title: string = null;
  togglePopUp: boolean = false;
  itemIdForDelete: number = null;
  item = new ItemModel();
  itemList: ItemModel[] = [];


  constructor(
    private crudService: ItemsCrudService,
    private snackBar: MatSnackBar,
    public displayService: DisplayService
  ) { }

  ngOnInit() {
    this.InitForm();
  }

  InitForm() {
    this.ItemForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      city: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
      enrolledDate: new FormControl(null),
      link: new FormControl(null),
    });
  }

  AddItem(id: number) {
    this.item = <ItemModel>this.ItemForm.value;
    this.item.id = id;
    console.log('item is....' + this.item);
    console.log('id is...' + id);
    if (this.item.id > 0) {
      console.log('updating');
      return this.UpdateItem(this.item, this.ItemForm);
    } else {

      console.log('adding');
      this.item.id = 0;

      this.crudService.Create(this.item).subscribe(res => {
        const result = <boolean>res;
        if (result) {
          this.ItemForm.reset();
          this.GetAllItems();
          this.displayService.display = 'list';
          this.item.id = 0;
        } else {
          console.log('Encountered an error.');
        }
      });

    }
  }

  UpdateItem(item: ItemModel, form: FormGroup) {
    this.crudService.Update(item).subscribe(res => {
      const result = <boolean>res;
      if (result) {
        form.reset();
        this.displayService.display = 'list';
        this.title = 'Список всех ссылок';
        this.GetAllItems();
        this.openSnackBar('👍🏼 запись обновлена');

      } else {
        console.log('Error encountered');
      }
    });
  }

  GetAllItems() {
      this.crudService.GetAll().subscribe(res => {
      const result = <ItemModel[]>res;
      this.itemList = result;
      console.log(this.itemList);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
