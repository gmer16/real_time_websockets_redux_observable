/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Ring from "ringjs";

import {
    TimeSeries,
    TimeRange,
    TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile
} from "pondjs";

import {
  ChartContainer,
  ChartRow,
  Charts,
  YAxis,
  ScatterChart,
  AreaChart,
  BarChart,
  Resizable,
  LineChart,
  Legend
} from 'react-timeseries-charts';

import styler from "./styler";
import { connect } from "react-redux";

   
const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 80;
const displayName = "AggregatorDemo";

// class Realtime extends React.Component {
let Realtime = ({ tickers, ticker }) => {
        const latestTime = `${tickers[ticker].time}`;

        const tickerState = tickers[ticker];

        const fiveMinuteStyle = {
            value: {
                normal: { fill: "#619F3A", opacity: 0.2 },
                highlight: { fill: "619F3A", opacity: 0.5 },
                selected: { fill: "619F3A", opacity: 0.5 }
            }
        };

        const scatterStyle = {
            value: {
                normal: {
                    fill: "red",
                    opacity: 0.5
                }
            }
        };

        const lineStyle = { 
            value: { normal: 
                { 
                    stroke: "steelblue" 
                } 
            }
        };

        //
        // Create a TimeSeries for our raw, 5min and hourly events
        //

        const eventSeries = new TimeSeries({
            name: "raw",
            events: tickerState.events.toArray()
        });

        // Timerange for the chart axis
        const initialBeginTime = new Date(2015, 0, 1);
        const timeWindow = (20 * sec)  ;

        let beginTime;
        const endTime = new Date(tickerState.time.getTime() + 1 * sec);
        if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
            beginTime = initialBeginTime;
        } else {
            beginTime = new Date(endTime.getTime() - timeWindow);
        }
        const timeRange = new TimeRange(beginTime, endTime);
        console.log(timeRange);

        // Charts (after a certain amount of time, just show hourly rollup)
        const charts = (
            <Charts>
                <ScatterChart axis="y" series={eventSeries} style={scatterStyle} />
                <LineChart axis="y" series={eventSeries} style={lineStyle} columns={["value"]}/>
            </Charts>
        );

        const dateStyle = {
            fontSize: 12,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4"
        };

        const style = styler([
            { key: "perc50", color: "#C5DCB7", width: 1, dashed: true },
            { key: "perc90", color: "#DFECD7", width: 2 }
        ]);

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-8">
                        <span style={dateStyle}>{latestTime}</span>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer timeRange={timeRange}>
                                <ChartRow height="150">
                                    <YAxis
                                        id="y"
                                        label="Value"
                                        min={0}
                                        max={100}
                                        width="70"
                                        type="linear"
                                    />
                                    {charts}
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
            </div>
        );
    }
// }

export default Realtime = connect(
  ({ tickers }) => ({ tickers }),
)(Realtime);
