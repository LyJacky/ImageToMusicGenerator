import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobiusMusicService} from "../../services/mobius-music-service/mobius-music.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  selectedFile: File | null = null;
  constructor(private _mobiusService: MobiusMusicService ) {}
  // ngOnInit(){
  //   this
  // }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // You can also
  }
  fun(): void{
    if (this.selectedFile){
      console.log("the selected file is :")
      console.log(this.selectedFile)
      // const formData: FormData = new FormData();
      // formData.append('image', this.selectedFile);
      // console.log('FormData properties:', formData);

      // Log FormData entries
      // console.log('FormData entries:');
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      let x = this._mobiusService.getData(this.selectedFile).subscribe(  data => {
        console.log(data); // Handle the data here
      },
      error => {
        console.error(error); // Handle errors here
      })
      console.log(x)
    }
  }

    getObjectUrl(file: File): string | null {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }
  requestSong(event: any): void{

  }
}

