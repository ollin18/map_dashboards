import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Slider, IconButton, Typography, Tooltip } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import PropTypes from 'prop-types';

const PositionContainer = styled('div')({
  position: 'absolute',
  zIndex: 1,
  bottom: '40px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const SliderInput = withStyles({
  root: {
    marginLeft: 12,
    width: '40%',
    height: 16,
  },
    thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '3px solid currentColor',
    marginTop: -4,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  mark: {
    backgroundColor: '#ffffff',
    height: 16,
    width: 4,
    marginTop: 0,
  },
  markActive: {
    opacity: 1,
    backgroundColor: '#ffffff',
  },
  active: {},
  valueLabel: {
    '& span': {
      background: 'none',
      color: '#000'
    }
  },
  track: {
    height: 16,
    borderRadius: 4,
  },
  rail: {
    height: 12,
    borderRadius: 4,
  },
})(Slider);

const marks = [
  {
    value: 1577836801000,
  },
  {
    value: 1580533200000,
  },
  {
    value: 1583038800000,
  },
  {
    value: 1585713600000,
  },
  {
    value: 1588305600000,
  },
  {
    value: 1590984000000,
  },
  {
    value: 1593576000000,
  },
  {
    value: 1596254400000,
  },
  {
    value: 1598932800000,
  },
  {
    value: 1601424000000,
  },
];


export default function RangeInput({min, max, value, animationSpeed, onChange, formatLabel}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animation] = useState({});

  // prettier-ignore
  useEffect(() => {
    return () => animation.id && cancelAnimationFrame(animation.id);
  }, [animation]);

  if (isPlaying && !animation.id) {
    const span = value[1] - value[0];
    let nextValueMin = value[0] + animationSpeed;
    if (nextValueMin + span >= max) {
      nextValueMin = min;
    }
    animation.id = requestAnimationFrame(() => {
      animation.id = 0;
      onChange([nextValueMin, nextValueMin + span]);
    });
  }

  const isButtonEnabled = value[0] > min || value[1] < max;

  return (
    <PositionContainer>
      <Button color="primary" disabled={!isButtonEnabled} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <PauseIcon title="Stop" fontSize="large" /> : <PlayIcon title="Animate" fontSize="large" />}
      </Button>
      <SliderInput
        min={min}
        max={max}
        value={value}
        marks={marks}
        onChange={(event, newValue) => onChange(newValue)}
        valueLabelDisplay="on"
        valueLabelFormat={formatLabel}
      />
    </PositionContainer>
  );
}
