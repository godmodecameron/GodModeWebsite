


  

// export const VIDEOS: Hero[] = [
//   { id: "SP6T9kGtooM", timeSet: 73,timeVideoStartsAt: 1609956000},
//   { id: "_cA2l0n5gPE", timeSet: 7, timeVideoStartsAt: 1609956000}];

  // export const HEROES: Hero[] = [
  //   { id: "aEGthdTzedk", timeSet: 6},
  //   { id: "L-z8fvX6NAo", timeSet: 10},
  //   { id: "y2SDAEOzrb4", timeSet: 5}];
    
    // export const HEROES: Hero[] = [
    //   { id: "DwRF5liTGB4", timeSet: 8},
    //   { id: "LNDhIGR-83w", timeSet: 32},
    //   { id: "93tV6-0Ugwk", timeSet: 0},
    //   { id: "f9Qi4XTGm3M", timeSet: 15}];


      
export class Video {
  id: string;
  clips: Clip[]
  show: string;
}

      
export class Clip {
  startTime: number;
  endTime: number;
  timeClipStartsAt: number;
}