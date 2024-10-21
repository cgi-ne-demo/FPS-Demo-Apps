import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FamilyListComponent } from './pages/familylist/familylist.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { EditFamilyComponent } from './pages/edit-family/edit-family.component';
import { FamilyDetailsComponent } from './pages/family-details/family-details.component';
import { EditParentComponent } from './pages/edit-parent/edit-parent.component';
import { EditChildComponent } from './pages/edit-child/edit-child.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'familylist', component : FamilyListComponent, canActivate: [OktaAuthGuard]},
  { path: 'login/callback', component: OktaCallbackComponent },
  {path: 'editFamily', component : EditFamilyComponent, canActivate: [OktaAuthGuard]},
  {path: 'editFamily/:id', component : EditFamilyComponent, canActivate: [OktaAuthGuard]},
  {path: 'familyDetails/:id', component : FamilyDetailsComponent, canActivate: [OktaAuthGuard]},
  {path: 'editParent', component : EditParentComponent, canActivate: [OktaAuthGuard]},
  {path: 'editParent/:id', component : EditParentComponent, canActivate: [OktaAuthGuard]},
  {path: 'editChild', component : EditChildComponent, canActivate: [OktaAuthGuard]},
  {path: 'editChild/:id', component : EditChildComponent, canActivate: [OktaAuthGuard]},
];
