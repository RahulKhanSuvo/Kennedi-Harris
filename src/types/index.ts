export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Authentication
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

// Home Page
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
  createdAt?: string;
  updatedAt?: string;
  // Flattened convenience fields populated by the API service
  PPG: string;
  RPG: string;
  BPG: string;
  DOUBLE_DOUBLES: string;
  REBOUNDS: string;
}

// Highlights
export interface HighlightVideo {
  _id: string;
  video_url: string;
  video_name: string;
  video_type: string;
}

export interface FeedVideo {
  title: string;
  video_url: string;
  _id: string;
}

export interface HighlightData {
  _id: string;
  title?: string;
  MainVideo_url: string;
  videos: HighlightVideo[];
  feedVideos: FeedVideo[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// About Page
export interface AboutData {
  _id: string;
  bannerImgUrl: string;
  earlyBeginningImgUrl: string;
  fristVictoryImgUrl: string;
  tranningImgUrl: string;
  accoladesMilestonesImgUrl: string;
  playerReflectionImgUrl: string;
  totalMajorReward: string | number;
  totalGamePlayed: string | number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Gallery Page
export interface GalleryPhoto {
  _id: string;
  name: string;
  type: string;
  url: string;
}

export interface GalleryData {
  _id: string;
  bannerFristImg: string;
  bannerSecondImg: string;
  mentorshipImgUrl: string;
  photos: GalleryPhoto[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Contact Page
export interface ContactDetails {
  email: string;
  phone: string;
  location: string;
}

export interface GetInTouchDetails extends ContactDetails {
  bookingEmail: string;
  mediaEmail: string;
}

export interface ContactData {
  _id: string;
  directReachout: ContactDetails;
  getInTouch: GetInTouchDetails;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Footer Page
export interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
}

export interface FooterData {
  _id: string;
  officialInquiries: ContactDetails;
  copyrightText: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface GameScheduleData {
  _id: string;
  date: string;
  matchName: string;
  // opponent: string;
  address: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
