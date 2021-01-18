import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Video } from './models/capitol-riots';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {



  epochTimeStart = 1609945208
  epochTimeEnd = 1609970400
  currentTime = 0

  videos: Video[] = [


    { id: "Ru0LbdU1oOQ", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609948552}], show: "block"},   //this video is time perfect
    { id: "os0Gp6lTYqU", clips:[{startTime: 58, endTime: 4509, timeClipStartsAt: 1609952313}], show: "block"},//this video is time perfect
    { id: "9vMXOO34JGk", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609952509}], show: "block"},//this video is time perfect
    { id: "KzWS7gJX5Z8", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609955762}], show: "block"},//this video is time perfect
    { id: "cRCEMN-lq_o", clips:[{startTime: null, endTime: 300, timeClipStartsAt: 1609955530}], show: "block"},//this video is roughly time perfect to the minute
    { id: "opyL0ksznz4", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609962812}], show: "block"},//this video is time perfect
    { id: "iIFxunpMf8I", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609961077}], show: "block"},//this video is roughly time perfect to the minute
    { id: "UzGDjf4dWoE", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609960261}], show: "block"},//this video is roughly time perfect to the minute
    { id: "SP6T9kGtooM", clips:[{startTime: null, endTime: 110, timeClipStartsAt: 1609960500}], show: "block"},//this video is roughly the right time
    { id: "_cA2l0n5gPE", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609960565}], show: "block"},//this video is roughly the right time
    { id: "wmScqhRsfm8", clips:[{startTime: null, endTime: null, timeClipStartsAt: 1609967140}], show: "block"},//this video is roughly time perfect to the minute
    { id: "6RMROSMPL_s", clips: [{startTime: null, endTime: null, timeClipStartsAt: 1609964540}], show: "block"}]; //this video is time perfect

  title = 'GodMode';
  currentTimeString = ""
  players: Array<YouTubePlayer> = [];

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
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
