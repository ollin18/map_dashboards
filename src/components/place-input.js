/* global requestAnimationFrame, cancelAnimationFrame */
import React, { useRef, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

import { styled } from '@mui/system';

import cdmxData from '../containers/Users/data/cdmx.geojson';
import gdlData from '../containers/Users/data/gdl.geojson';
import mtyData from '../containers/Users/data/mty.geojson';

const PositionContainer = styled('div')({
  position: 'absolute',
  zIndex: 1,
  top: '0',
  left: '0px',
  width: '100%',
  display: 'flex',
  justifyContent: 'left',
  margin: '12px',
  marginRight: '0px',
  marginLeft: '0px',
  fontSize: '18',
  background: '#fff',
  border: '0',
  alignItems: 'center',
  padding: '0px',
});


const CITY = [
  { label: "Mexico City, Mexico City", latitude: 19.30, longitude: -99.15, data: cdmxData, min: -74.92, max: 188.47, d_cp: "09" },
  { label: "Guadalajara, Jalisco", latitude: 20.67, longitude: -103.39, data: gdlData, min: 1.27e-9, max: 0.16, d_cp: "14" },
  { label: "Monterrey, Nuevo León", latitude: 25.67, longitude: -100.31, data: mtyData, min: 2.77e-14, max: 0.073, d_cp: "19" },
];

export default function CityInput({ value, onChange }) {
  return (
    <PositionContainer>
      <Autocomplete
        value={value}
        selectOnFocus
        id="country-select"
        style={{ width: '100%' }}
        autoHighlight
        options={CITY}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a City"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-city',
            }}
            sx={{
              '& .MuiAutocomplete-option': {
                fontSize: 15,
                '& > span': {
                  marginRight: 10,
                  marginLeft: 10,
                  fontSize: 18,
                },
              },
            }}
          />
        )}
      />
    </PositionContainer>
  );
}
