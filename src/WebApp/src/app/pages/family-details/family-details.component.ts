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


@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [CardModule,ButtonModule,RouterModule,TableModule,DividerModule],
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

  ngOnInit() {
    
      this.familyService.getFamilyById(this.activatedRoute.snapshot.params['id']).subscribe(family => {
        this.family = family;
      });

      this.parentService.getAllParentsForFamily(this.activatedRoute.snapshot.params['id']).subscribe(parents => {
        this.parents = parents;
      });

      this.childService.getAllChildrenForFamily(this.activatedRoute.snapshot.params['id']).subscribe(children => {
        this.children = children;
      });
  }


}
