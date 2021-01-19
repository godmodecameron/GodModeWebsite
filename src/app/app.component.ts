import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Video } from './models/capitol-riots';
import { YouTubePlayer } from '@angular/youtube-player';
import { IntroDialogComponentComponent} from './intro-dialog-component/intro-dialog-component.component'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

constructor(public dialog: MatDialog){
}

  epochTimeStart = 1609945208
  epochTimeEnd = 1609970400
  currentTime = 0

  videos: Video[] = [

    { id: "Ru0LbdU1oOQ", precision: "second", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609948552}], show: "block"},   
    { id: "os0Gp6lTYqU", precision: "second", clips:[{startTime: 58, endTime: 4509, timeClipStartsAt: 1609952313}], show: "block"},
    { id: "9vMXOO34JGk", precision: "second", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609952509}], show: "block"},
    { id: "KzWS7gJX5Z8", precision: "second", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609955762}], show: "block"},
    { id: "cRCEMN-lq_o", precision: "minute", clips:[{startTime: null, endTime: 300, timeClipStartsAt: 1609955530}], show: "block"},
    { id: "opyL0ksznz4", precision: "second", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609962812}], show: "block"},
    { id: "iIFxunpMf8I", precision: "minute", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609961077}], show: "block"},
    { id: "UzGDjf4dWoE", precision: "minute", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609960261}], show: "block"},
    { id: "SP6T9kGtooM", precision: "few minutes", clips:[{startTime: null, endTime: 110, timeClipStartsAt: 1609960500}], show: "block"},
    { id: "_cA2l0n5gPE", precision: "few minutes", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609960565}], show: "block"},
    { id: "wmScqhRsfm8", precision: "minute", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609967140}], show: "block"},
    { id: "Xm0gPe4MgS0", precision: "minute", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609959889}], show: "block"},
    
    { id: "YNtnGRnGyvk", precision: "few minutes", clips:[{startTime: 1740, endTime: 2558, timeClipStartsAt: 1609964765}], show: "block"},

    { id: "6RMROSMPL_s", precision: "second", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609964540}], show: "block"}];

  title = 'GodMode';
  currentTimeString = ""
  players: Array<YouTubePlayer> = [];

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.dialog.open(IntroDialogComponentComponent)
  }

  formatLabel(value: number | null) {

    var dateTime = new Date(value*1000)

    this.currentTimeString = dateTime.toLocaleTimeString()

    return this.currentTimeString;
  }

  sliderChanged(event: any) {
    var dateTime = new Date(event.value*1000)
    this.currentTime = event.value
    this.currentTimeString = dateTime.toLocaleTimeString()
    this.updateVideosToShow(this.currentTime)

  }

  updateVideosToShow(currentTime) {
      for (let video of this.videos) {
        var clipToShow = this.getClipToShow(currentTime, video)
        if(clipToShow != null){
          video.show = "block"
          this.playClip(clipToShow, video.id)
        }else{
          video.show = "none"
          this.pauseVideo(video.id)
        }
      }
  }

  getClipToShow(currentTime, video){
    for (let clip of video.clips) {
      if(this.isBetweenClip(video.id, clip, currentTime)){
        return clip
      }

    }

    return null
  }

  isBetweenClip(videoId, clip, currentTime){
    return this.isAfterClip(currentTime, clip) && this.isBeforeEndOfClip(clip, videoId)
  }

  isAfterClip(currentTime, clip) {
    return currentTime > clip.timeClipStartsAt
  }

  isBeforeEndOfClip(clip, videoId){
for (let player of this.players) {
  if(videoId == player.videoId){

    if(player.getDuration() ==0){
      return true;
    }

    if(clip.endTime == null){
      return this.currentTime < clip.timeClipStartsAt + player.getDuration()
    }else{
      return this.currentTime < clip.timeClipStartsAt + (clip.endTime - clip.startTime)
    }
  }
}
  }

  isBeforeEndOfVideo(timeClipStartsAt, endTime, id){
    for (let player of this.players) {
      if(id == player.videoId){

        if(player.getDuration() ==0){
          return true;
        }

        if(endTime == null){
          return this.currentTime < timeClipStartsAt + player.getDuration()
        }else{
          return this.currentTime < timeClipStartsAt + (endTime - timeClipStartsAt)
        }
      }
    }
  }

  playClip(clip, videoId){
    for (let player of this.players) {
      if(videoId == player.videoId){
        player.seekTo(this.getSeekTimeForClip(clip, player.videoId), true)
        player.playVideo()
      }
    }
  }

  pauseVideo(videoId){
    for (let player of this.players) {
      if(videoId == player.videoId){
        player.pauseVideo()
      }
    }
  }

  getSeekTimeForClip(clip, videoId){

    for(let video of this.videos){
      if(video.id == videoId){

      if(clip.startTime != null){
        return clip.startTime + (this.currentTime - clip.timeClipStartsAt)
      }else{  
        return this.currentTime - clip.timeClipStartsAt
      }
    
    }
    }
    return 0
  }

  videoStateChange( e ) {

}


playerReady(event){
  this.players.push(event.target);
}

}
