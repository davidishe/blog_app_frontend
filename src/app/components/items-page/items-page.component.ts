import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemModel } from 'src/app/model/objects';
import { ItemsCrudService } from 'src/app/services/items-crud.service';
import { ToastrManager } from 'src/app/services/toastr-manager.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})

export class ItemsPageComponent implements OnInit {

  ItemForm: FormGroup;
  togglePopUp: boolean = false;
  itemIdForDelete: number = null;
  item = new ItemModel();
  itemList: ItemModel[] = [];

  constructor(
    private crudService: ItemsCrudService,
    public toastr: ToastrManager,
    private snackBar: MatSnackBar,
    public displayService: DisplayService
    ) { }

  ngOnInit() {
    this.displayService.display = 'list';
    this.displayService.title = 'Список всех ссылок';
    this.GetAllItems();
    this.InitForm();
  }

  InitForm() {
    this.ItemForm = new FormGroup({
      enrolledDate: new FormControl(null),
      link: new FormControl(null),
    });
  }

  GetAllItems() {
      this.crudService.GetAll().subscribe(res => {
      const result = <ItemModel[]>res;
      this.itemList = result;
      console.log(this.itemList);
    });
  }

  GetItemById(id: number, type?: string) {
    this.crudService.GetById(id).subscribe(res => {
      const result = <ItemModel>res;
      if (result !== null) {
        if (type === 'addNew') {
          this.item = result;
          this.displayService.display = type;
          this.ItemForm.controls.enrolledDate.setValue(result.enrolledDate);
          this.ItemForm.controls.link.setValue(result.link);
          this.item.id = id;
          console.log(this.item.id);

        }

        if (type === 'viewItem') {
          this.displayService.display = type;
          this.item = result;
        }

      } else {
        this.toastr.errorToastr('Encountered an error.', 'Oops!');
      }
    });
  }

  UpdateItem(item: ItemModel, form: FormGroup) {
    this.crudService.Update(item).subscribe(res => {
      const result = <boolean>res;
      if (result) {
        form.reset();
        this.displayService.display = 'list';
        this.displayService.title = 'Список всех ссылок';
        this.GetAllItems();
        this.toastr.successToastr('Item Information Updated.', 'Success!');
        this.openSnackBar('👍🏼 запись обновлена');

      } else {
        this.toastr.errorToastr('Encountered an error.', 'Oops!');
      }
    });
  }

  DeleteItem(id: number) {
    this.togglePopUp = true;
    this.itemIdForDelete = id;

    this.crudService.Delete(this.itemIdForDelete).subscribe(res => {
      this.togglePopUp = false;
      const result = <boolean>res;
      console.log(result);
      console.log(res);
      if (!result) {
        this.GetAllItems();
        this.toastr.successToastr('Student Information Deleted.', 'Success!');
        this.openSnackBar('☝🏽 ссылка №' + id + ' удалена');
      } else {
        this.toastr.errorToastr('Encountered an error.', 'Oops!');
      }
    });
  }

  /* To copy Text from Textbox */
  CopyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar('🙌🏼 ссылка скопирована');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}





