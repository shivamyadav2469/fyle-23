import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './includes/profile/profile.component';
import { TagsComponent } from './includes/tags/tags.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MainComponent,
    ProfileComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
