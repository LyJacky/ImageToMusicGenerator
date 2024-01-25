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
  audioBlob: Blob | null = null;

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
        const audioData = data;
        this.audioBlob = new Blob([audioData], { type: 'audio/wav' });
        this.updateAudioPlayer()
        console.log("The data for the thing: "+data); // Handle the data here
        console.log(data)
      },
      error => {
        console.error(error); // Handle errors here
      })
      console.log("X is what hte this.movius serve get data is returning i think?: ")
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
  updateAudioPlayer() {
    if (this.audioBlob) {
      // Create a data URL from the Blob
      const audioUrl = URL.createObjectURL(this.audioBlob);
      console.log(' THE AUDIO URL IS :')
      console.log(audioUrl)

      // Set the audio URL to be used by the <audio> element
      const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
      if (audioPlayer) {
        audioPlayer.src = audioUrl;
      }
    }
  }
}

