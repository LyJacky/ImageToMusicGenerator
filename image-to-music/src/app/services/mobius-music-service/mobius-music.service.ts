import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobiusMusicService {
  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  // Example method to make a GET request
  getData(data:any): Observable<any> {
    console.log("i went inside of here:")
    console.log(`${this.apiUrl}/api/data`)
    console.log('FormData entries from the service:');
    const formData: FormData = new FormData();
    if (data instanceof File && data.type.startsWith('video/')) {
      // Data is a video
   return new Observable<any>(observer => {
      this.getFrames(data)
        .then(frames => {
          console.log('THE FRAMES IT RETURNED')
          console.log(frames); // Do something with the frames
          for (let i = 0; i < frames.length; i++){
            console.log(frames[i])
          }
          console.log(frames.length)
          formData.append('image1', frames[0]);
          formData.append('image2', frames[1]);
          formData.append('image3', frames[2]); // Assuming you want to send only the first frame
          console.log(formData);
          this.http.post(`${this.apiUrl}/api/data`, formData, { responseType: 'arraybuffer' })
            .subscribe(
              response => {
                observer.next(response);
                observer.complete();
              },
              error => {
                observer.error(error);
              }
            );
        })
        .catch(error => {
          // An error occurred while extracting frames
          console.error(error); // Handle the error
          observer.error(error); // Propagate the error
        });
    });

    } else {
      // Data is not a video
      console.log('THE DATA IS IN THE FORM OF')
      console.log(data)
      formData.append('image1', data);
      console.log('Data is not a video');
      return this.http.post(`${this.apiUrl}/api/data`,formData, { responseType: 'arraybuffer' });

    }
    // formData.append('image', data);
    // console.log('FormData properties:', formData);
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    return this.http.post(`${this.apiUrl}/api/data`,formData, { responseType: 'arraybuffer' });
  }

  // Example method to make a POST request
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }

 getFrames(videoFile: File): Promise<File[]> {
    return new Promise<File[]>((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = async () => {
            const duration = video.duration;
            const timestamps = [0, duration / 2, duration];

            const frames: File[] = [];
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) {
                reject(new Error('Canvas context is not available'));
                return;
            }

            for (const timestamp of timestamps) {
                video.currentTime = timestamp;
                await new Promise<void>(resolve => {
                    video.onseeked = () => resolve();
                });

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);

                const dataUrl = canvas.toDataURL('image/png');
                const blob = await fetch(dataUrl).then(res => res.blob());

                if (blob) {
                    const file = new File([blob], `frame_${timestamp}.png`, { type: 'image/png' });
                    frames.push(file);
                }
            }

            resolve(frames);
        };

        video.onerror = () => reject(new Error('Failed to load video'));
        video.src = URL.createObjectURL(videoFile);
    });
}

}
// function extractFramesFromVideo(videoFile: File): Promise<HTMLImageElement[]> {
//     return new Promise((resolve, reject) => {
//         const video = document.createElement('video');
//         video.preload = 'metadata';
//         video.onloadedmetadata = async () => {
//             const frames: HTMLImageElement[] = [];
//
//             // Define timestamps to extract frames from (e.g., 1 second, 2 seconds, 3 seconds)
//             const timestamps = [1, 2, 3];
//
//             for (const timestamp of timestamps) {
//                 // Set the video's current time to the timestamp
//                 video.currentTime = timestamp;
//
//                 // Wait for the video to seek to the specified time
//                 await new Promise<void>(resolve => {
//                     video.onseeked = () => resolve();
//                 });
//
//                 // Create a hidden canvas element
//                 const hiddenCanvas = document.createElement('canvas');
//                 hiddenCanvas.width = video.videoWidth;
//                 hiddenCanvas.height = video.videoHeight;
//                 const context = hiddenCanvas!.getContext('2d');
//
//                 // Draw the current frame onto the hidden canvas
//                 context!.drawImage(video, hiddenCanvas.width, hiddenCanvas.height);
//
//                 // Convert the canvas content to an image element
//                 const img = new Image();
//                 img.src = hiddenCanvas.toDataURL('image/png');
//                 frames.push(img);
//             }
//
//             resolve(frames);
//         };
//
//         // Set the video source to the selected file
//         video.src = URL.createObjectURL(videoFile);
//     });
// }
