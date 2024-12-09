export interface Address {
  // Required fields that should always be present
  city: string;
  country: string;
  isoCountryCode: string;

  // Optional fields that might not always be available
  district?: string;
  region?: string;
  postalCode?: string;
  name?: string;
  street?: string;
  streetNumber?: string;
  subregion?: string;
  timezone?: string; // Made optional since it might not always be relevant
}
