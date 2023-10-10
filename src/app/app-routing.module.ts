import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './Features/blog-post/blogpost-list/blogpost-list.component';
import { BlogPostAddComponent } from './Features/blog-post/blog-post-add/blog-post-add.component';
import { BlogpostEditComponent } from './Features/blog-post/blogpost-edit/blogpost-edit.component';
import { HomePageComponent } from './Features/Public/home-page/home-page.component';
import { BlogDetailComponent } from './Features/Public/blog-detail/blog-detail.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { RegisterComponent } from './Features/Auth/register/register.component';
import { authGuard } from './Features/Auth/guards/auth.guard';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';

const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: 'full'
  },
  {
    path: "home", component: HomePageComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'blog/:url', component: BlogDetailComponent
  },
  {
    path: 'admin/categories', component: CategoryListComponent, canActivate: [authGuard]
  },
  {
    path: 'admin/categories/add', component: AddCategoryComponent, canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id', component: EditCategoryComponent, canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts', component: BlogpostListComponent, canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/add', component: BlogPostAddComponent, canActivate: [authGuard]
  },
  {
    path: 'admin/blogposts/:id', component: BlogpostEditComponent, canActivate: [authGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
