import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-edit-parent',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CardModule,ButtonModule,InputTextModule,InputMaskModule,CommonModule],
  templateUrl: './edit-parent.component.html',
  styleUrl: './edit-parent.component.scss'
})
export class EditParentComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router);
  parentService: ParentService = inject(ParentService);
  parent?: Parent;
  title: string = 'Add Parent';

  parentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.title = 'Edit Parent';
      this.parentService.getParentById(this.activatedRoute.snapshot.params['id']).subscribe((parent) => {
        this.parentForm.patchValue(parent);
        this.parent = parent;
      });
    }
  }

  saveParent(): void {
    const updatedParent = this.parentForm.getRawValue() as Parent
    if (this.parent) {
     
      updatedParent.parentId = this.parent.parentId;
      updatedParent.familyId = this.parent.familyId;
      this.parentService.updateParent(updatedParent).subscribe((parent) => { this.route.navigate(['/familyDetails', this.parent?.familyId]); });
    } else {
     
      updatedParent.familyId = this.activatedRoute.snapshot.queryParams['familyId'];
      console.log('familyId ',  this.activatedRoute.snapshot.params['familyId']);
      console.log('UpdatedParent ', updatedParent);
      this.parentService.createParent(updatedParent).subscribe((parent) => { this.route.navigate(['/familyDetails', updatedParent.familyId]); });
    }
  }

  deleteParent(): void {
    if (this.parent) {
      this.parentService.deleteParent(this.parent.parentId).subscribe((family) => { this.route.navigate(['/familyDetails', this.parent?.familyId]); });
    }
  }

  cancel(): void {

    if (this.parent) {    
    this.route.navigate(['/familyDetails', this.parent?.familyId]);
    } else {
      this.route.navigate(['/familyDetails', this.activatedRoute.snapshot.queryParams['familyId']]);
    }

  }
}
