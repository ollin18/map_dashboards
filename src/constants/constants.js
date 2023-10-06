import { MapView } from '@deck.gl/core';

export const SET_ACTIVE_OPTION = "SET_ACTIVE_OPTION";
export const SET_SELECT = "SET_SELECT";
export const SET_FLOW_DIRECTION = "SET_FLOW_DIRECTION";
export const CLICKEDSA2 = "CLICKEDSA2";
export const CLICKEDFEATURES = "CLICKEDFEATURES";
export const GEOCODER = "GEOCODER";

export const MAP_TYPE = {
  SUMA: "suma",
  GROWTH: "growth",
  TRANSACTIONS: "transactions",
  SEGREGATION: "segregation",
};

export const FLOW_IN = "inflow";
export const FLOW_OUT = "outflow";
export const FLOW_BI = "bidirectional";

export const LIGHT_MAP = 'mapbox://styles/ollin19/ckk5ywdyl07hq17oc76fde73v';
export const DARK_MAP = 'mapbox://styles/ollin19/cki2owg0n19ms19qjq0lzw0iu';

export const INITIAL_VIEW_STATE = {
  longitude: -102,
  latitude: 24,
  zoom: 4.5,
  pitch: 0,
  bearing: 0,
  maxZoom: 6,
  minZoom: 4
};

export const MAPBOX_TOKEN = 'pk.eyJ1IjoieG16aHUiLCJhIjoiY2tibWlrZjY5MWo3YjJ1bXl4YXd1OGd3bCJ9.xEc_Vf2BkuPkdHhHz521-Q'

export const MAP_VIEW = new MapView({
  farZMultiplier: 100
});