import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChildService } from '../../services/child.service';
import { Child } from '../../models/child';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-edit-child',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CardModule,ButtonModule,InputTextModule,InputMaskModule,CommonModule],
  templateUrl: './edit-child.component.html',
  styleUrl: './edit-child.component.scss'
})
export class EditChildComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router);
  childService: ChildService = inject(ChildService);
  child?: Child;
  title: string = 'Add Child';

  childForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.title = 'Edit Child';
      this.childService.getChildById(this.activatedRoute.snapshot.params['id']).subscribe((child) => {
        this.childForm.patchValue(child);
        this.child = child;
      });
    }
  }

  saveChild(): void {
    const updatedChild = this.childForm.getRawValue() as Child
    if (this.child) {
     
      updatedChild.childId = this.child.childId;
      updatedChild.familyId = this.child.familyId;
      this.childService.updateChild(updatedChild).subscribe((child) => { this.route.navigate(['/familyDetails', this.child?.familyId]); });
    } else {
     
      updatedChild.familyId = this.activatedRoute.snapshot.queryParams['familyId'];
      console.log('familyId ',  this.activatedRoute.snapshot.params['familyId']);
      console.log('UpdatedChild ', updatedChild);
      this.childService.createChild(updatedChild).subscribe((child) => { this.route.navigate(['/familyDetails', updatedChild.familyId]); });
    }
  }

  deleteChild(): void {
    if (this.child) {
      this.childService.deleteChild(this.child.childId).subscribe((family) => { this.route.navigate(['/familyDetails', this.child?.familyId]); });
    }
  }

  cancel(): void {

    if (this.child) {    
    this.route.navigate(['/familyDetails', this.child?.familyId]);
    } else {
      this.route.navigate(['/familyDetails', this.activatedRoute.snapshot.queryParams['familyId']]);
    }

  }
}
