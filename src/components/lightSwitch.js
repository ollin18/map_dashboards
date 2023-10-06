import React from 'react';
import { Switch } from 'antd';


export default function LightSwitch({ checked, onChange }) {
  const [state, setState] = React.useState({
    dark: true,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Switch checked={state.dark} checkedChildren="Dark" unCheckedChildren="Light" style={{
      position: 'absolute',
      zIndex: 1,
      float: 'right',
      top: '70px',
      right: '1%',
    }}
      onChange={(event) => {
        onChange(event)
        setState({ ...state, ["dark"]: event})
        }
      }
      name="dark" />
    </div>
  );
}