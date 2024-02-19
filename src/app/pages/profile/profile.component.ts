import {Component, OnInit} from '@angular/core';
import {Profile} from "../../models/profile";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidator} from "../../utils/password-validator";
import * as locationsJson from '../../../assets/counties/counties.json';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    profile: Profile;
    hide = true;
    hide2 = true;
    hide3 = true;
    passwordForm: FormGroup;
    profileDetailsForm: FormGroup;
    locations: Locations = locationsJson;
    counties: string[] = [];
    cities: string[] = [];

    passwordErrorMessage = {
        'old_password': [
            {type: 'required', message: 'Field is required'},
        ],
        'new_password': [
            {type: 'required', message: 'Field is required'},
            {type: 'minlength', message: 'Password too short (5 characters min)'},
            {type: 'pattern', message: 'At least one uppercase [A-Z], lowercase [a-z] and number'}
        ],
        'confirm_password': [
            {type: 'required', message: 'Field is required'},
            {type: 'areEqual', message: 'Passwords are not the same'}
        ]
    };

    profileDetailsErrorMessage = {
        'username': [
            {type: 'required', message: 'Field is required'},
            {type: 'minlength', message: 'Password too short (5 characters min)'},
            {type: 'pattern', message: 'At least one uppercase [A-Z], lowercase [a-z] and number'}
        ],
        'phone': [
            {type: 'required', message: 'Field is required'},
            {type: 'pattern', message: 'Can contain numbers only'}
        ],
        'county': [
            {type: 'required', message: 'Field is required'},
        ],
        'city': [
            {type: 'required', message: 'Field is required'},
        ],
        'street': [
            {type: 'required', message: 'Field is required'},
            {type: 'minlength', message: 'At least 3 characters'}
        ],
    };

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.getProfileData();
        this.createCountiesOptions();
        this.createCitiesOptions();
    }

    createCountiesOptions(): void {
        this.counties = this.locations.counties.map((county: County) => county.simple ?? county.name);
    }

    createCitiesOptions(): void {
        const currentCounty = this.locations.counties.find(location =>
            location.name === this.profileDetailsForm.get('county')?.value
            || location.simple === this.profileDetailsForm.get('county')?.value);

        if (currentCounty === undefined) {
            return;
        }

        this.cities = currentCounty.localities.map(city => city.simple ?? city.name);
    }

    onCountyChange(): void {
        this.profileDetailsForm.get('city')?.setValue('');
        this.createCitiesOptions();
    }

    getProfileData(): void {
        this.userService.getProfile().subscribe(profileDto => {
            this.profile = profileDto;
            this.initializeForms();
        });
    }

    initializeForms(): void {
        this.buildPasswordForm();
        this.buildProfileDetailsForm();
    }

    buildPasswordForm(): void {
        this.passwordForm = this.formBuilder.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.compose([Validators.minLength(5),
                Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
            confirm_password: new FormControl('', Validators.required),
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });
    }

    buildProfileDetailsForm(): void {
        this.profileDetailsForm = this.formBuilder.group({
            email: [{value: this.profile.email, disabled: true}],
            username: [this.profile.username, Validators.required],
            phone: [this.profile.phone, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            county: [this.profile.county.replace(this.profile.county[0], this.profile.county[0].toUpperCase()), Validators.required],
            city: [this.profile.city.replace(this.profile.city[0], this.profile.city[0].toUpperCase()), Validators.required],
            street: [this.profile.street, Validators.compose([Validators.required, Validators.minLength(3)])]
        });
    }

    updatePassword(): void {
        const dto = this.passwordForm.value;
        this.userService.updatePassword(dto).subscribe({
            next: () => {
                this.snackbar.open('The password has been successfully changed!', 'x', {
                    panelClass: 'success',
                    verticalPosition: 'bottom',
                    horizontalPosition: "center",
                    duration: 3500
                })
            },
            error: () => {
                this.snackbar.open('There was a problem while changing the password. Please try again in a few moments.', 'x', {
                    panelClass: 'error',
                    verticalPosition: 'bottom',
                    horizontalPosition: "center",
                    duration: 3500
                })
            }
        })
    }

    updateProfileDetails(): void {
        const dto = this.profileDetailsForm.value;
        dto.email = this.profile.email;

        this.userService.updateProfileDetails(dto).subscribe({
            next: () => {
                this.snackbar.open('The profile has been successfully updated!', 'x', {
                    panelClass: 'success',
                    verticalPosition: 'bottom',
                    horizontalPosition: "center",
                    duration: 3500
                })
            },
            error: () => {
                this.snackbar.open('There was a problem while updating the profile. Please try again in a few moments.', 'x', {
                    panelClass: 'error',
                    verticalPosition: 'bottom',
                    horizontalPosition: "center",
                    duration: 3500
                })
            }
        })
    }

}

export type Locations = {
    counties: County[];
};

export type County = {
    auto: string;
    name: string;
    simple?: string;
    localities: Locality[]
};

export type Locality = {
    name: string;
    simple?: string;
};
