export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;
  rocket: Rocket;
  links: Links;
}

export interface Rocket {
  rocket_name: string;
  rocket_type: string;
}

export interface Links {
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}
