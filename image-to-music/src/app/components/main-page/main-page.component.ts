import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobiusMusicService} from "../../services/mobius-music-service/mobius-music.service";
import WaveSurfer from 'wavesurfer.js';
import {NULL_AS_ANY} from "@angular/compiler-cli/src/ngtsc/typecheck/src/expression";

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
  //if the file is a video then do a method
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
    getFrames(): Promise<HTMLImageElement[]> {
    return new Promise<HTMLImageElement[]>((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = async () => {
            const duration = video.duration;
            const timestamps = [0, duration / 2, duration];

            const frames: HTMLImageElement[] = [];
            for (const timestamp of timestamps) {
                video.currentTime = timestamp;
                await new Promise<void>(resolve => {
                    video.onseeked = () => resolve();
                });

                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context!.drawImage(video,  canvas.width, canvas.height);

                const img = new Image();
                img.src = canvas.toDataURL('image/png');
                console.log("this is the image testing");
                console.log(img);

                frames.push(img);
            }

            resolve(frames);
        };

        video.onerror = () => reject(new Error('Failed to load video'));
        if (this.selectedFile !== null) {
            // const blob = new Blob([selectedFile], { type: selectedFile.type });
            console.log('I FUCKIN WENT IN THERE')
            console.log('I WANNA SEE IF THE VIDEO STARTS WITH THE VIDEO THINGY')
            console.log(this.selectedFile.type.startsWith('video/'))
            video.src = URL.createObjectURL(this.selectedFile);
        } else {
            // Handle the case where selectedFile is null
          console.log('WELP II FAILED')
        }
    });
}
  isImage() :boolean{
    if(!(this.selectedFile) || this.selectedFile.type.startsWith('image/')){
      return true
    }
    return false
  }
  isVideo() :boolean{
    if(!(this.selectedFile) || this.selectedFile.type.startsWith('video/')){
          return true
        }
    return false
  }
}

