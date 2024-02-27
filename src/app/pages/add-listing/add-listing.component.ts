import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, CategoryService} from "../../services/category.service";
import {forkJoin, Observable, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SafeUrl} from "@angular/platform-browser";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ImageEditorDialogComponent} from "../../components/image-editor-dialog/image-editor-dialog.component";
import {v4 as uuidv4} from 'uuid';
import {ListingService} from "../../services/listing.service";

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
    private dialog: MatDialog,
    private listingService: ListingService
  ) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.createListingForm();
  }

  createListingForm(): void {
    this.listingForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      price: [null, Validators.compose([Validators.required, Validators.pattern('^\\d+(.\\d{1,2})?$')])],
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

      image.localId = uuidv4();
      this.uploadedImages.unshift(image);
    })

  }

  selectImageInput(): void {
    this.addImageInput.nativeElement.click();
  }

  setSelected(image: UploadedImage): void {
    this.uploadedImages = this.uploadedImages.map(uImage => {
      uImage.selected = uImage.localId === image.localId;
      return uImage;
    });
  }

  removeImage(event: any, image: UploadedImage): void {
    event.stopPropagation();
    event.preventDefault();
    this.uploadedImages = this.uploadedImages.filter(uImage => uImage.localId !== image.localId);

    this.snackbar.open('The image has been successfully removed.', 'x', {
      panelClass: 'success',
      verticalPosition: 'bottom',
      duration: 3500
    })
  }

  createNewListing(): void {
    const dto = this.listingForm.value;
    this.listingService.createListing(dto).pipe(
      switchMap(listingId => forkJoin(this.getImagesObservableArray(listingId)))
    ).subscribe(res => console.log('done'));
  }

  getImagesObservableArray(listingId: string): Observable<any>[] {
    return this.uploadedImages.map(image => this.listingService.addImageToListing(image.file, listingId));
  }
}

export type UploadedImage = {
  name: string;
  file: any;
  localUrl: SafeUrl;
  url?: SafeUrl;
  selected?: boolean;
  localId?: string;
}
