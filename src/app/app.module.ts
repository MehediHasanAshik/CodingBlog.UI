import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './Features/blog-post/blogpost-list/blogpost-list.component';
import { BlogPostAddComponent } from './Features/blog-post/blog-post-add/blog-post-add.component'
import { MarkdownModule } from 'ngx-markdown';
import { BlogpostEditComponent } from './Features/blog-post/blogpost-edit/blogpost-edit.component';
import { ImageSelectorComponent } from './Shared/Components/image-selector/image-selector.component';
import { HomePageComponent } from './Features/Public/home-page/home-page.component';
import { BlogDetailComponent } from './Features/Public/blog-detail/blog-detail.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { RegisterComponent } from './Features/Auth/register/register.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    BlogPostAddComponent,
    BlogpostEditComponent,
    ImageSelectorComponent,
    HomePageComponent,
    BlogDetailComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
