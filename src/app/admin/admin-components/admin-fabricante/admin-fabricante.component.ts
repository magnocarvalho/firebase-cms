import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-fabricante',
  templateUrl: './admin-fabricante.component.html',
  styleUrls: ['./admin-fabricante.component.scss']
})
export class AdminFabricanteComponent implements OnInit {

  fabricantes: Observable<any>;
  dialogRef: MdDialogRef<any>;
  selectedOption: any;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public globalService: GlobalService
  ) {
    this.fabricantes = db.list('/fabricantes').snapshotChanges();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  deleteCategory(category: any) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/fabricantes/' + category.key).remove();

        let snackBarRef = this.snackBar.open('Fabricante deleted', 'OK!', {
          duration: 3000
        });
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
  }

}
