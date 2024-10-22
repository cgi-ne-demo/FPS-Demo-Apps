import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../models/family';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Parent } from '../../models/parent';
import { Child } from '../../models/child';
import { ChildService } from '../../services/child.service';
import { ParentService } from '../../services/parent.service';
import { combineLatestWith } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [CardModule,ButtonModule,RouterModule,TableModule,DividerModule,ProgressSpinnerModule],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router);
  familyService: FamilyService = inject(FamilyService);
  parentService: ParentService = inject(ParentService);
  childService: ChildService = inject(ChildService);
  family?: Family;
  parents? : Parent[];
  children? : Child[];
  isLoading: boolean = true;

  ngOnInit() {
    
      const family$ = this.familyService.getFamilyById(this.activatedRoute.snapshot.params['id']);

      const parents$ = this.parentService.getAllParentsForFamily(this.activatedRoute.snapshot.params['id']);

      const children$ = this.childService.getAllChildrenForFamily(this.activatedRoute.snapshot.params['id']);

      family$.pipe(combineLatestWith(parents$, children$)).subscribe(([family, parents, children]) => {
        this.family = family;
        this.parents = parents;
        this.children = children;
        this.isLoading = false;
      },);

  
  }


}
