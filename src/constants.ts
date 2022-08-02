export const PROGRAM_MEDIA_PATH = 'public/icons/program/';
export const STORY_MEDIA_PATH = 'public/icons/stories/';
export const WEBINAR_MEDIA_PATH = 'public/icons/webinar/';
export const PROFILES_MEDIA_PATH = 'public/images/profile/';
export const BLOGS_MEDIA_PATH = 'public/images/blog/';

export const LANGUAGES = ['English', 'German'];
export const LANGUAGES_CODE = ['en', 'de'];
export const DEFAULT_LANGUAGE = 'English';
export const DEFAULT_LANGUAGE_CODE = 'en';
export const LANGUAGE_MAP = {
  en: 'English',
  de: 'German',
};

export const GET_GOOGLE_USER_INFO_URL = (accessToken: string) =>
  `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
