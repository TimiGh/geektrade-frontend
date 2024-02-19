import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ImageEditorDialogComponent} from "../../components/image-editor-dialog/image-editor-dialog.component";

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  listingForm: FormGroup;
  categories: Observable<Category[]>;
  uploadedImages: UploadedImage[] = [];
  @ViewChild('addImageInput', {static: false}) addImageInput: any;

  errorMessage = {
    'title': [
      {type: 'required', message: 'Field is required'},
      {type: 'minlength', message: 'Title is too short (min 3 characters)'},
      {type: 'maxlength', message: 'Title is too long (max 50 characters)'},
    ],
    'price': [
      {type: 'required', message: 'Field is required'},
      {type: 'pattern', message: 'The price should of the form [199.99]'},
    ],
    'category': [
      {type: 'required', message: 'Field is required'},
    ],
    'quality': [
      {type: 'required', message: 'Field is required'},
    ],
    'description': [
      {type: 'required', message: 'Field is required'},
      {type: 'maxlength', message: 'The description is too long (max 255 characters)'},
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.createListingForm();
  }

  createListingForm(): void {
    this.listingForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      price: [null, Validators.required],
      isNegotiable: [false],
      category: ['', Validators.required],
      quality: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    })
  }

  addImage(event: any): void {
    const file: File = event.target.files[0];
    const format = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!format.includes(file.type)) {
      this.snackbar.open('You can only upload .jpeg, .jpg and .png files!', 'x', {
        panelClass: 'error',
        verticalPosition: 'bottom',
        horizontalPosition: "center",
        duration: 3500
      })
      return;
    }

    const dialogRef: MatDialogRef<ImageEditorDialogComponent> = this.dialog.open(ImageEditorDialogComponent, {
      data: file,
      maxWidth: 640,
      width: '640px',
      autoFocus: false,
      panelClass: 'base-panel'
    });

    dialogRef.afterClosed().subscribe((image) => {
      if (this.uploadedImages.length < 1) {
        image.selected = true;
      }

      this.uploadedImages.unshift(image);
    })

  }

  selectImageInput(): void {
    this.addImageInput.nativeElement.click();
  }

  setSelected(image: UploadedImage): void {
    this.uploadedImages = this.uploadedImages.map(uImage => {
      uImage.selected = uImage.localUrl === image.localUrl || uImage.url === image.url;
      return uImage;
    });
  }

  removeImage(event: any, image: UploadedImage): void {
    event.stopPropagation();
    event.preventDefault();
    this.uploadedImages = this.uploadedImages.filter(uImage => uImage.localUrl !== image.localUrl && uImage.url !== image.url);

    this.snackbar.open('The image has been successfully removed.', 'x', {
      panelClass: 'success',
      verticalPosition: 'bottom',
      duration: 3500
    })
  }

  createNewListing(): void {

  }
}

export type UploadedImage = {
  name: string;
  file: any;
  localUrl: SafeUrl;
  url?: SafeUrl;
  selected?: boolean;
}
