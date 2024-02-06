import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobiusMusicService} from "../../services/mobius-music-service/mobius-music.service";
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  selectedFile: File | null = null;
  audioBlob: Blob | null = null;
  isLoading = false;
  private wavesurfer!: WaveSurfer;
  protected audioUrl!: String;
  constructor(private _mobiusService: MobiusMusicService ) {}
  ngOnInit(){
      this.wavesurfer = WaveSurfer.create({
      container: '#audioVis', // The ID of your audio element
      waveColor: 'violet',
      progressColor: 'purple',
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // You can also
  }
  fun(): void{
    if (this.selectedFile){
      console.log("the selected file is :")
      console.log(this.selectedFile)
      this.isLoading = true
      let x = this._mobiusService.getData(this.selectedFile).subscribe(  data => {
        this.isLoading = false
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

  updateAudioPlayer() {
    if (this.audioBlob) {
      // Create a data URL from the Blob
      const audioUrl = URL.createObjectURL(this.audioBlob);
      console.log(' THE AUDIO URL IS :')
      console.log(audioUrl)
      this.wavesurfer.load(audioUrl)
      this.audioUrl = audioUrl

      // Set the audio URL to be used by the <audio> element
      const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
      if (audioPlayer) {
        audioPlayer.src = audioUrl;
      }
    }
  }
    playAudio(): void {
    // Play the loaded audio when the "Play" button is clicked
    this.wavesurfer.play();
  }
   pauseAudio(): void {
    // Pause the audio playback when the "Pause" button is clicked
    this.wavesurfer.pause();
  }
}

