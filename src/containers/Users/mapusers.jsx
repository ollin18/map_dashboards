import React, { useState, useEffect, useCallback } from 'react';

import DataSet from '@antv/data-set';

import { Checkbox } from 'antd';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { FlyToInterpolator } from '@deck.gl/core';

import { csv } from 'd3-request';
import * as d3 from 'd3';

import CityInput from '../../components/place-input';
import ColorBar, { colorScaleFunction, colorScaleFunctionC } from '../../components/color-legend';
import StateName from '../../components/state-name';
import LightSwitch from '../../components/switch-ant';
import TaxonomyPlot from '../../components/taxonomy-line';

import stateData from './data/country.geojson'

import dataLine from './data/tec.json';
import dataLineCP from './data/round_tec_cp.csv';
import dataLineTaxCsv from './data/national_taxonomy.csv'
import dataLineTax from './data/national_taxonomy.json'

import dataCdmx from './data/cdmx_taxonomy.csv'

import dataTable from './data/giros.json';

import dataTableCsv from './data/changes.csv';

import { Layout, Table } from 'antd';
import '../css/ElMapa.css';
import * as constants from '../../constants/constants'
import { data } from 'jquery';

const { Content, Sider } = Layout;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Low', 'Medium', 'High'];
const defaultCheckedList = ['Low', 'Medium', 'High'];
window.stateTitle = "National"

function arrMerge(k, v) {
  var obj = {};
  for (var i = 0; i < k.length; i++) {
    obj[k[i]] = v[i];
  }
  return obj;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

function spentCompare(data) {
  return data.transform({
    type: 'map',
    callback(row) {
      row.spent = (row.post - row.pre) / row.pre;
      return row;
    }
  })
    .transform({
      type: 'aggregate',
      fields: ['spent'],
      operations: ['median'],
      as: ['spent'],
      groupBy: ['busisness']
    })
    .transform({
      type: 'filter',
      callback(row) {
        return (row.post > 0 && row.pre > 0);
      }
    })
    .transform({
      type: 'sort-by',
      fields: 'spent',
      order: 'ASC'
    })
}

function getTooltip({ object }) {
  return (
    object &&
    `\
      C.P.: ${object.properties.d_cp}
      Change in spenditure: ${object.properties.suma == null ? "Null" : Math.round((object.properties.suma + Number.EPSILON) * 100) / 100}%
      `
  );
}

function tCountry({ object }) {
  return (
    object &&
    `\
      State: ${object.properties.NOM_ENT}
      Change in spenditure: ${Math.round((object.properties.suma + Number.EPSILON) * 100) / 100}%
      `
  );
}

let dataTablef = dataTable.filter(({ busisness }) => busisness !== '0')
var result = [];
dataTablef.reduce(function (res, value) {
  if (!res[value.busisness]) {
    res[value.busisness] = { busisness: value.busisness, spent: 0 };
    result.push(res[value.busisness])
  }
  res[value.busisness].spent += value.spent;
  return res;
}, {});

const dv = new DataSet.View().source(dataLine)
var dvi = new DataSet.View().source(dataLineTax)
window.filterline = dvi.rows
dvi.transform({
  type: 'filter',
  callback(row) {
    return (row.admin_1_code !== "national" & ["High", "Mid", "Low"].includes(row.q));
  }
})
  .transform({
    type: 'aggregate',
    fields: ['ratio'],
    operations: ['median'],
    as: ['ratio'],
    groupBy: ['q', 'date']
  })

const columns = [
  {
    title: "Taxonomy",
    dataIndex: 'busisness',
    key: 'busisness',
    width: "50%",
  },
  {
    title: "Expenditure change",
    dataIndex: 'spent',
    key: 'spent',
    width: "50%",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.spent - b.spent,
    render: (value) => {
      const theVal = Math.round((value + Number.EPSILON) * 10000) / 100
      let textColor = Math.abs(theVal) > 10 ? 'white' : 'black'
      return {
        props: {
          style: {
            background: isFinite(theVal) ? rgbToHex(colorScaleFunctionC(theVal).match(/\d+/g).map(Number)) : "black",
            color: textColor
          }
        },
        children: < span > {theVal} %</span >,
      }
    }
  },
]

window.min = -2
window.max = 20
window.tickdiv = 10
export default function Mapa() {

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChangeChecked = useCallback(list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    var dtf = new DataSet.View().source(window.test)
    dtf.transform({
      type: 'filter',
      callback(row) {
        return list.includes(row.q)
      }
    })
    dtf = spentCompare(dtf)
    setDsTable(dtf)
  })

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    var dtf = new DataSet.View().source(window.tableData)
    if (e.target.checked === true) {
      dtf
        .transform({
          type: 'filter',
          callback(row) {
            return ["High", "Medium", "Low"].includes(row.q)
          }
        })
      dtf = spentCompare(dtf)
      setDsTable(dtf)
    } else {
      dtf
        .transform({
          type: 'filter',
          callback(row) {
            return ["None"].includes(row.q)
          }
        })
      dtf = spentCompare(dtf)
      setDsTable(dtf)
    }
  };

  const [mapStyle, setMapStyle] = useState(constants.LIGHT_MAP);
  const changeColor = useCallback(event => {
    if (event) {
      setMapStyle(constants.LIGHT_MAP)
    } else {
      setMapStyle(constants.DARK_MAP)
    }
  })

  // const [tabData, setTabData] = useState([])
  const [dsTable, setDsTable] = useState([])
  useEffect(() => {
    csv(dataTableCsv, function (data) {
      const tableData = data.map(row => ({
        d_cp: row.d_cp,
        admin_1_code: row.admin_1_code,
        busisness: row.busisness,
        q: row.q,
        pre: Number(Number(row.pre).toFixed(0)),
        post: Number(Number(row.post).toFixed(0))
      })
      )
      window.tableData = tableData
      window.test = tableData
      // setTabData(tableData)
      var dt = new DataSet.View()
        .source(tableData)
        .transform({
          type: 'filter',
          callback(row) {
            return ["High", "Medium", "Low"].includes(row.q)
          }
        })
      dt = spentCompare(dt)

      window.dt = dt
      setDsTable(dt)
    });

  }, []);


  // I'm not having luck reading the json to get d3.extent working so I have to manually set the domain
  const [viewState, setViewState] = useState(constants.INITIAL_VIEW_STATE);
  const [placeData, setPlaceData] = useState(stateData)
  const [theStyle, setTheStyle] = useState(true)
  const [stateVis, setStateVis] = useState(true)
  const [cityVis, setCityVis] = useState(false)
  const goToCity = useCallback(event => {
    if (event != null) {
      setViewState({
        longitude: event.longitude,
        latitude: event.latitude,
        zoom: 9.7,
        bearing: 0,
        transitionDuration: 8000,
        transitionInterpolator: new FlyToInterpolator()
      })
      setPlaceData(event.data)
      setTheStyle(false)
      setStateVis(false)
      setCityVis(true)
      window.min = -100
      window.max = 100
      window.tickdiv = 50
      csv(dataCdmx, function (data) {
        const csvData = data.map(row => ({
          date: row.date.substring(0, 10),
          d_cp: row.d_cp,
          q: row.q,
          ratio: Number(Number(row.ratio).toFixed(4))
        })
        )
        const ds = new DataSet.View().source(csvData)
        ds.transform({
          type: 'filter',
          callback(row) {
            return row.q !== "National"
          }
        })
          .transform({
            type: 'aggregate',
            fields: ['ratio'],
            operations: ['median'],
            as: ['ratio'],
            groupBy: ['q', 'date']
          })
        setTheData(ds)
        window.dataCity = ds
        var dtf = new DataSet.View().source(window.tableData)
        dtf.transform({
          type: 'filter',
          callback(row) {
            return row.admin_1_code === event.d_cp
          }
        })
        dtf = spentCompare(dtf)
        setDsTable(dtf)
        window.tableCity = dtf
      });
    } else {
      setViewState({
        longitude: -102,
        latitude: 24,
        zoom: 4.5,
        pitch: 0,
        bearing: 0,
        minZoom: 4,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator()
      })
      setTheData(dvi)
      setDsTable(window.dt)
      setTheStyle(true)
      setCityVis(false)
      setStateVis(true)
      window.min = -2
      window.max = 20
      window.tickdiv = 10
    }
  }, []);

  const [theData, setTheData] = useState(dvi)

  console.log(theData.rows)
  useEffect(() => {
    csv(dataCdmx, function (data) {
      const csvData = data.map(row => ({
        date: row.date.substring(0, 10),
        d_cp: row.d_cp,
        q: row.q,
        tax: row.tax,
        ratio: Number(Number(row.ratio).toFixed(4))
      })
      )
      window.dvf = csvData
    });
    return () => {
      return undefined;
    };
  }, []);


  const onClick = useCallback(event => {
    if (event.object !== null) {
      csv(dataLineCP, function (data) {
        const ds = new DataSet.View().source(window.dvf)
        ds.transform({
          type: 'filter',
          callback(row) {
            return (row.d_cp === event.object.properties.d_cp || row.d_cp === "total")
          }
        })
        window.filterline = ds.rows
        ds
          .transform({
            type: 'aggregate',
            fields: ['ratio'],
            operations: ['median'],
            as: ['ratio'],
            groupBy: ['q', 'date']
          })
        setTheData(ds)
        var dtf = new DataSet.View().source(window.tableData)
        dtf
          .transform({
            type: 'filter',
            callback(row) {
              return row.d_cp === event.object.properties.d_cp
            }
          })
        dtf = spentCompare(dtf)
        setDsTable(dtf)
      });
      window.stateTitle = event.object.properties.d_cp
    }
    setTheData(window.dataCity)
    setDsTable(window.tableCity)
  }, [])

  const onClickC = useCallback(event => {
    if (event.object !== null) {
      csv(dataLineTaxCsv, function (data) {
        const csvData = data.map(row => ({
          date: row.date.substring(0, 10),
          d_cp: row.admin_1_code,
          q: row.q,
          tax: row.tax,
          ratio: Number(Number(row.ratio).toFixed(4))
        })
        )
        const ds = new DataSet.View().source(csvData)
        ds
          .transform({
            type: 'filter',
            callback(row) {
              return (row.admin_1_code !== "national" & ["High", "Mid", "Low"].includes(row.q));
            }
          })
          .transform({
            type: 'filter',
            callback(row) {
              return row.d_cp === event.object.properties.d_cp
            }
          })
        window.filterline = ds.rows
        ds.transform({
          type: 'aggregate',
          fields: ['ratio'],
          operations: ['median'],
          as: ['ratio'],
          groupBy: ['q', 'date']
        })
        setTheData(ds)
        var dtf = new DataSet.View().source(window.tableData)
        dtf.transform({
          type: 'filter',
          callback(row) {
            return row.admin_1_code === event.object.properties.d_cp
          }
        })
          .transform({
            type: 'filter',
            callback(row) {
              return ["High", "Medium", "Low"].includes(row.q)
            }
          })
        window.test = dtf.rows
        dtf = spentCompare(dtf)
        setDsTable(dtf)
      });
      window.stateTitle = event.object.properties.d_cp
    }
    setTheData(dvi)
    setDsTable(window.dt)
  }, [])

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: stateData,
      visible: stateVis,
      opacity: 0.8,
      stroked: true,
      filled: true,
      pickable: true,
      extruded: true,
      wireframe: true,
      lineWidthMinPixels: 2,
      getLineColor: [0, 0, 0],
      getFillColor: d => colorScaleFunction(d.properties.suma).match(/\d+/g).map(Number),
      getLineWidth: 20,
      autoHighlight: true,
      highlightColor: [24, 144, 255],
    }),
    new GeoJsonLayer({
      id: 'geojson2',
      data: placeData,
      visible: cityVis,
      opacity: 0.8,
      stroked: true,
      filled: true,
      pickable: true,
      extruded: true,
      wireframe: true,
      lineWidthMinPixels: 2,
      getLineColor: [80, 80, 80],
      getElevation: 0,
      getFillColor: d => d.properties.suma == null ? [0, 0, 0] : colorScaleFunctionC(d.properties.suma).match(/\d+/g).map(Number),
      getLineWidth: 20,
      autoHighlight: true,
      highlightColor: [24, 144, 255],
    })
  ];



  const selectedRows = [0]
  const [stateTable, setStateTable] = useState(selectedRows)
  const onSelectChange = useCallback((keys, rows) => {
    const busisness = rows.map(val => val.busisness)
    setStateTable(keys)
    const dfl = new DataSet.View().source(window.filterline)
    if (stateVis) {
      dfl
        .transform({
          type: 'filter',
          callback(row) {
            return (row.admin_1_code !== "national" & ["High", "Mid", "Low"].includes(row.q));
          }
        })
        .transform({
          type: 'filter',
          callback(row) {
            return busisness.includes(row.tax)
          }
        })
        .transform({
          type: 'aggregate',
          fields: ['ratio'],
          operations: ['median'],
          as: ['ratio'],
          groupBy: ['q', 'date']
        })
    } else {
      dfl
        .transform({
          type: 'filter',
          callback(row) {
            return busisness.includes(row.tax)
          }
        })
        .transform({
          type: 'aggregate',
          fields: ['ratio'],
          operations: ['median'],
          as: ['ratio'],
          groupBy: ['q', 'date']
        })
    }
    setTheData(dfl)
  });

  const onSelectAllChange = useCallback((keys, rows) => {
    const busisness = rows.map(val => val.busisness)
    setStateTable([...Array(busisness.length).keys()])
    const dfl = new DataSet.View().source(window.filterline)
    if (stateVis) {
      dfl
        .transform({
          type: 'filter',
          callback(row) {
            return (row.admin_1_code !== "national" & ["High", "Mid", "Low"].includes(row.q));
          }
        })
        .transform({
          type: 'filter',
          callback(row) {
            return busisness.includes(row.tax)
          }
        })
        .transform({
          type: 'aggregate',
          fields: ['ratio'],
          operations: ['median'],
          as: ['ratio'],
          groupBy: ['q', 'date']
        })
    } else {
      dfl
        .transform({
          type: 'filter',
          callback(row) {
            return busisness.includes(row.tax)
          }
        })
        .transform({
          type: 'aggregate',
          fields: ['ratio'],
          operations: ['median'],
          as: ['ratio'],
          groupBy: ['q', 'date']
        })
    }
    setTheData(dfl)
  })

  // const hasSelected = stateTable.length > 0;

  const pageSize = 16;
  return (
    <Layout >
      <div style={{ position: 'absolute', zIndex: 0, height: "calc(100% - 96px - 64px)", width: "calc(100% - 500px)", bottom: "64px", marginLeft : "-9px"}}>
        <Content >
          <DeckGL
            views={constants.MAP_VIEW}
            layers={layers}
            initialViewState={viewState}
            controller={true}
            getTooltip={theStyle ? tCountry : getTooltip}
            onClick={theStyle ? onClickC : onClick}
          >

            <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} mapboxApiAccessToken={constants.MAPBOX_TOKEN} />
          </DeckGL>
          <ColorBar min={window.min} max={window.max} tickdiv={window.tickdiv} />
        </Content>
      </div>
      <Sider width={"500px"} style={{ position: 'absolute', zIndex:0, overflow: 'auto', height: 'calc(100% - 96px - 64px)', bottom: "64px",  width: '100%', right: 0, backgroundColor: '#3D707F', textAlign: 'center' }}>

        <div style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gap: '4px',
            alignItems: 'start'
        }}>
            <CityInput style={{ width: '100%' }} onChange={goToCity} />
            <LightSwitch onChange={changeColor} />
            <TaxonomyPlot style={{ width: '100%' }} data={theData.rows} />
            <Checkbox style={{ backgroundColor: '#3D707F' }} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>
            <CheckboxGroup style={{ backgroundColor: '#3D707F' }} options={plainOptions} value={checkedList} onChange={onChangeChecked} />

            <Table rowSelection={{ stateTable, onChange: onSelectChange, onSelectAll: onSelectAllChange }}
              dataSource={dsTable.rows} size={'small'}
              style={{ height: '100%', width: '80%', left: '100px' }}
              columns={columns} scroll={{ y: 'fit-content' }} sticky={false}
              bordered pagination={data.length > pageSize && { pageSize }} />

        </div>

      </Sider>
    </Layout >

  );
}

