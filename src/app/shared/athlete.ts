export interface Athlete {
  personal: {
    name: string;
    dob?: string;
    nationality?: string;
    gender?: string;
    marital?: boolean;
    location?: string;
  };
  interest: {
    drinks?: string; // Alcohol
    interests?: string;
    charities?: Array<string>;
    pets?: string;
  };
  sports: {
    association?: Array<string>;  //  (e.g. NBA, NFL)
    team?: string // (e.g. New York Giants)
    sports?: Array<string>; // (Can Multiple)
  };
  _id?: string;
  __v?: string;
  about?: string;
  socials?: Array<object>; // Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat);
  profilePic?: string; // (If you have time - S3 storage)
}
