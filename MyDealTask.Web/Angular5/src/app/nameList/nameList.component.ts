import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../shared/services/data-service.module';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material';

import {Element} from '../../../api/generated/model';
//import {ElementService, Element_GetParams} from '../../../api/generated/controllers/Element';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'app-nameList',
    templateUrl: './nameList.component.html',
    styleUrls: ['./nameList.component.css']
})
export class NameListComponent implements OnInit {

  private id:number;
  private selected:string;
  private values:object;
  private element:Element={};
  private editing:boolean=false;
  public selectedFiles;

  private pnlFileContent:string="";

  /*
  uploader
  */
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private route: ActivatedRoute, 
        private _dataService: DataService, 
        public snackBar: MatSnackBar) { 
        _dataService.elementName ="PassengerList";
      
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
  }

  openSnackBar(msg: string) {
    var config =  new MatSnackBarConfig();
    config.duration = 1500;
    this.snackBar.open(msg, "Ok", config);
  }

  deleteElement(el) {
      this._dataService.delete(el.id)
    .subscribe((data: any) => {
      this.element = data;
      this.editing = true;
    },
    error => () => {
        this.openSnackBar('error when deletin');
    },
    () => {
        this.openSnackBar('deleted succesfully');
        //this._slimLoadingBarService.complete();
    });
  }
    

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
        this.files.push(output.file);

        var reader = new FileReader();
        var tmp = this;
        reader.onload = function () {
            var dataURL = reader.result;
            tmp.pnlFileContent = dataURL;
        };
        reader.readAsText(output.file.nativeFile);

    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }
 
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this._dataService.actionUrl,
      method: 'POST',
      data: null// { foo: 'bar' }
    };
 
    this.uploadInput.emit(event);
  }
 
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
 
  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
 
  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  ngOnInit():void {

    this._dataService
            .getAll<any[]>()
            .subscribe((data: any[]) => {
              this.values = data},
            error => () => {
                this.openSnackBar('error');
            },
            () => {
                this.openSnackBar('success');
                //this._slimLoadingBarService.complete();
            });

            
  }
  

}
