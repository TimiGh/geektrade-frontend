import {Component, Inject, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CropperSettings, ImageCroppedEvent, ImageCropperComponent, ImageTransform} from "ngx-image-cropper";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageConverter} from "../../utils/image-converter";

@Component({
  selector: 'app-image-editor-dialog',
  templateUrl: './image-editor-dialog.component.html',
  styleUrls: ['./image-editor-dialog.component.scss']
})
export class ImageEditorDialogComponent implements OnChanges {
  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  image: { data: string, url: SafeUrl, file: File };
  originalFile: File;
  imageBase64: string = '';
  transform: ImageTransform = {};
  canvasRotation: number = 0;
  cropperSettings: Partial<CropperSettings> = {
    format: 'jpeg',
    aspectRatio: 4 / 3,
    maintainAspectRatio: false,
    resizeToWidth: 1280,
    cropperMinWidth: 400,
    imageQuality: 80,
    output: 'base64'
  }

  constructor(
    private dialogRef: MatDialogRef<ImageEditorDialogComponent>,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) protected data: File
  ) {
    this.originalFile = this.data;
    this.readFile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
      this.checkFileType();
    }
  }

  checkFileType(): void {
    const format: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
    if (this.data && !format.includes(this.data.type)) {
      this.snackbar.open('File type not supported!', 'X', {
        panelClass: 'error',
        verticalPosition: 'bottom',
        duration: 3500
      });
    }
  }

  readFile(): void {
    const reader: FileReader = new FileReader();
    reader.onload = (loadEvent: any) => {
      this.image = {
        data: loadEvent.target.result,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.data)),
        file: this.data
      };
      this.imageBase64 = this.image.data;
    }
    reader.readAsDataURL(this.data);
  }

  rotate(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      this.canvasRotation--;
    } else {
      this.canvasRotation++;
    }
  }

  flip(axis: 'horizontal' | 'vertical'): void {
    if (axis === 'horizontal') {
      this.flipHorizontally();
    } else {
      this.flipVertically();
    }
  }

  flipHorizontally(): void {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertically(): void {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  cropImage(event: any): void {
    this.image.data = event.base64!;
    const blob: Blob = ImageConverter.convertBase64ToBlob(this.image.data);
    this.image.file = new File([blob], this.originalFile.name, {type: this.originalFile.type});
    this.image.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.image.file));
  }

  saveImage(): void {
    this.dialogRef.close(this.image);
  }

  close(): void {
    this.dialogRef.close();
  }
}
