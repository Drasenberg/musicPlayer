import { Component, OnInit } from '@angular/core';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { CloudService } from 'src/app/services/cloud.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
// src/app/pages/player/player.component.ts
// ... import statements and @Component declaration ...
export class PlayerComponent implements OnInit {

  
  public files = [];
  state: StreamState;
  currentFile: any = {};
  repeat: boolean = false;
  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    // get media files
    this.cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  ngOnInit(){
    this.cloudService.getFiles().subscribe(
      data => this.files = data
    );
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
    });
  }
  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }
  pause() {
    this.audioService.pause();
  }
  play() {
    this.audioService.play();
  }
  stop() {
    this.audioService.stop();
  }
  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onRepeat(){
    if(this.repeat === false){
      this.repeat = true;
      this.audioService.repeat(this.repeat);
    }
    else if (this.repeat === true){
      this.repeat = false;
      this.audioService.repeat(this.repeat);
    }
  }
  
}
