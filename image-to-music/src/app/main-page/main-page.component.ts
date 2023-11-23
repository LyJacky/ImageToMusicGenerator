import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // You can also
  }
    getObjectUrl(file: File): string | null {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }
}

