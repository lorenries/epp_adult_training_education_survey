import React from "react";
import { BarGroup } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { max } from "d3-array";
import ChartContainer from "../components/ChartContainer";
import { ParentSize } from "@vx/responsive";
import { localPoint } from "@vx/event";
import { LegendOrdinal } from "@vx/legend";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { colors as naColors } from "../lib/colors";

class VerticalGroupedBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMouseOver = (event, datum) => {
    if (this.props.showTooltip) {
      const coords = localPoint(event.target.ownerSVGElement, event);
      this.props.showTooltip({
        tooltipLeft: coords.x + 20,
        tooltipTop: coords.y - 10,
        tooltipData: datum
      });
    }
  };

  render() {
    const margin = this.props.margin || {
      top: 40,
      left: 40,
      right: 40,
      bottom: 100
    };
    const {
      data,
      title,
      subtitle,
      source,
      height,
      x,
      y,
      keys,
      xFormat,
      yFormat,
      xAxisLabel,
      yAxisLabel,
      colors,
      tooltipTemplate,
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip,
      showTooltip
    } = this.props;
    return (
      <ChartContainer
        title={title}
        subtitle={subtitle}
        source={source}
        height={height}
      >
        <ParentSize>
          {({ width, height }) => {
            // bounds
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // scales
            const x0Scale = scaleBand({
              rangeRound: [0, xMax],
              domain: data.map(x),
              padding: 0.2,
              tickFormat: () => val => xFormat(val)
            });
            const x1Scale = scaleBand({
              rangeRound: [0, x0Scale.bandwidth()],
              domain: keys,
              padding: 0.1
            });
            const yScale = scaleLinear({
              rangeRound: [yMax, 0],
              domain: [
                0,
                max(data, d => {
                  return max(keys, key => d[key]);
                })
              ],
              tickFormat: () => val => yFormat(val)
            });
            const zScale = scaleOrdinal({
              domain: keys,
              range: colors
            });

            return (
              <React.Fragment>
                <svg width={width} height={height}>
                  <BarGroup
                    top={margin.top}
                    left={margin.left}
                    data={data}
                    keys={keys}
                    height={yMax}
                    x0={x}
                    x0Scale={x0Scale}
                    x1Scale={x1Scale}
                    yScale={yScale}
                    zScale={zScale}
                    onMouseLeave={data => event => {
                      hideTooltip();
                    }}
                    onMouseMove={data => event => {
                      this.handleMouseOver(event, data);
                    }}
                  />
                  <AxisLeft
                    scale={yScale}
                    top={margin.top}
                    left={margin.left}
                    label={yAxisLabel ? yAxisLabel : null}
                    stroke={naColors.grey.dark}
                    tickStroke={naColors.grey.dark}
                    tickFormat={yFormat ? yFormat : null}
                    tickLabelProps={(value, index) => ({
                      fill: naColors.grey.dark,
                      fontSize: 12,
                      textAnchor: "end",
                      dy: "0.33em"
                    })}
                  />
                  <AxisBottom
                    scale={x0Scale}
                    top={yMax + margin.top}
                    left={margin.left}
                    label={xAxisLabel ? xAxisLabel : null}
                    stroke={naColors.grey.dark}
                    tickStroke={naColors.grey.dark}
                    hideAxisLine
                    tickLabelProps={(value, index) => ({
                      fill: naColors.grey.dark,
                      fontSize: 11,
                      textAnchor: "middle",
                      width: x0Scale.bandwidth(),
                      verticalAnchor: "start"
                    })}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: margin.top / 2 - 10,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "14px"
                  }}
                >
                  <LegendOrdinal
                    scale={zScale}
                    direction="row"
                    labelMargin="0 15px 0 0"
                  />
                </div>
                {tooltipOpen && (
                  <TooltipWithBounds
                    top={tooltipTop}
                    left={tooltipLeft}
                    className="tooltip"
                  >
                    <div className="tooltip__content-container">
                      {tooltipTemplate(tooltipData)}
                    </div>
                  </TooltipWithBounds>
                )}
              </React.Fragment>
            );
          }}
        </ParentSize>
      </ChartContainer>
    );
  }
}

const VerticalGroupedBarWithTooltip = withTooltip(VerticalGroupedBar);

export { VerticalGroupedBar, VerticalGroupedBarWithTooltip };
