import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../models/family';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-family-list',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule,RouterModule],
  templateUrl: './familylist.component.html',
  styleUrl: './familylist.component.scss'
})
export class FamilyListComponent {

  familyService: FamilyService = inject(FamilyService);
  families : Family[] = [];

  constructor() {
    this.familyService.getAllFamilies().subscribe((data) => {this.families = data;});
  }
  
 
}