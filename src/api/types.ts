export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface HomeNumbers {
  PPG: string;
  RPG: string;
  BPG: string;
  DOUBLE_DOUBLES: string;
  REBOUNDS: string;
}

export interface HomeData {
  _id: string;
  frist_img: string;
  second_img: string;
  NUMBERS: HomeNumbers;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;

  // Flattened client-side properties
  PPG: string;
  RPG: string;
  BPG: string;
  DOUBLE_DOUBLES: string;
  REBOUNDS: string;
}

export interface VideoItem {
  video_url: string;
  video_name: string;
  video_type: string;
}

export interface FeedVideoItem {
  title: string;
  video_url: string;
}

export interface HighlightData {
  _id: string;
  MainVideo_url: string;
  videos: VideoItem[];
  feedVideos: FeedVideoItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HighlightResponse {
  success: boolean;
  message: string;
  data: HighlightData;
}
export interface HighlightVideo {
  video_url: string;
  video_name: string;
  video_type: string;
}

export interface FeedVideo {
  title: string;
  video_url: string;
}

export interface ActiveHighlight {
  _id: string;
  MainVideo_url: string;
  videos: HighlightVideo[];
  feedVideos: FeedVideo[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ActiveHighlightResponse {
  success: boolean;
  message: string;
  data: ActiveHighlight;
}
