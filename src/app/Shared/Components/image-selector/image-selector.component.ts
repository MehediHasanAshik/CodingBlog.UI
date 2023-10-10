import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { BlogImage } from '../../Models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  private file?: File;
  fileName: string = '';
  title: string = '';

  blogImages: BlogImage[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  selectImage(image: BlogImage): void{
    this.imageService.selectImage(image);
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: res => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      })
    }
  }

  private getImages(): void {
    this.imageService.getAllImages().subscribe({
      next: res => {
        if (res) {
          this.blogImages = res;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
