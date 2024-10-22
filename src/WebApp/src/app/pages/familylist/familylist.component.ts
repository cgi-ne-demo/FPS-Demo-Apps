import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../models/family';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-family-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, ProgressSpinnerModule],
  templateUrl: './familylist.component.html',
  styleUrl: './familylist.component.scss'
})
export class FamilyListComponent implements OnInit {

  familyService: FamilyService = inject(FamilyService);
  families: Family[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.familyService.getAllFamilies().subscribe((data) => { this.families = data; this.isLoading = false; });
  }


}