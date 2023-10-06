import React from 'react';
import * as d3 from 'd3';
import { Card } from 'antd';

export default function StateName({
    stateTitle="National",
    onChange
} = {}) {

    return (
        <div style={{
                    position: 'fixed', zIndex: 1,
                    width: '400px', height: '80px', bottom: "80%", left: "20%"
                }}>
                <svg height="80" width="400px">
                    <text font-size="55" x="20%" y="50%" fill="blue" stroke="red">astateTitle</text>
                </svg>
        </div>
    )
}