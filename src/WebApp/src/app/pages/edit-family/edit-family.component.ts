import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../models/family';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-edit-family',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, CardModule, ButtonModule,InputMaskModule],
  templateUrl: './edit-family.component.html',
  styleUrl: './edit-family.component.scss'
})
export class EditFamilyComponent {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router);
  familyService: FamilyService = inject(FamilyService);
  family?: Family;
  source: string = '';
  title: string = 'Add Family';

  familyForm = new FormGroup({
    familyName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.title = 'Edit Family';
      this.familyService.getFamilyById(this.activatedRoute.snapshot.params['id']).subscribe((family) => {
        this.familyForm.patchValue(family);
        this.family = family;
      });
    }
  }

  saveFamily(): void {
    console.log('Family ', this.family);
    if (this.family) {
      const updatedFamily = this.familyForm.getRawValue() as Family
      updatedFamily.familyId = this.family.familyId;
      this.familyService.updateFamily(updatedFamily).subscribe((family) => { this.route.navigate(['/familylist']); });
    } else {
      this.familyService.createFamily(this.familyForm.getRawValue() as Family).subscribe((family) => { this.route.navigate(['/familylist']); });
    }
  }

  deleteFamily(): void {
    if (this.family) {
      this.familyService.deleteFamily(this.family.familyId).subscribe((family) => { this.route.navigate(['/familylist']); });
    }
  }

  cancel(): void {

    if (this.activatedRoute.snapshot.queryParams['source']) {
      this.route.navigate(['/familyDetails', this.family?.familyId]);
    } else {
      this.route.navigate(['/familylist']);
    }

  }

}
