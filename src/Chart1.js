import React from "react";
import ChartContainer from "./components/ChartContainer";
import { BarStackHorizontal } from "@vx/shape";
import { ParentSize } from "@vx/responsive";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { LegendOrdinal } from "@vx/legend";
import { max } from "d3-array";
import { colors as naColors } from "./lib/colors";
import { AnnotationBracket } from "react-annotation";
import "./scss/Tooltip.scss";

class Chart1 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMouseOver = (event, datum) => {
    if (this.props.showTooltip) {
      const coords = localPoint(event.target.ownerSVGElement, event);
      this.props.showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: datum
      });
    }
  };

  render() {
    const initialMarginRight = this.props.margin.right;
    const margin = this.props.margin;

    const {
      data,
      title,
      subtitle,
      source,
      x,
      y,
      width,
      height,
      xFormat,
      yFormat,
      keys,
      colors,
      tooltipTemplate,
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip,
      showTooltip
    } = this.props;

    const totals = data.reduce((acc, cur) => {
      const t = keys.reduce((total, key) => {
        total += +cur[key];
        return total;
      }, 0);
      acc.push(t);
      return acc;
    }, []);

    return (
      <ChartContainer
        title={title ? title : null}
        subtitle={subtitle ? subtitle : null}
        source={source ? source : null}
        width={width}
        height={height}
      >
        <ParentSize>
          {({ width, height }) => {
            if (width - margin.left - margin.right < 400) {
              margin.right = 20;
            } else {
              margin.right = initialMarginRight;
            }
            // bounds
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // scales
            const xScale =
              this.props.xScale ||
              scaleLinear({
                rangeRound: [0, xMax],
                domain: [0, max(totals)],
                nice: true
              });
            const yScale =
              this.props.yScale ||
              scaleBand({
                rangeRound: [yMax, 0],
                domain: data.map(y),
                padding: 0.2
              });
            const zScale =
              this.props.zScale ||
              scaleOrdinal({
                domain: keys,
                range: colors
              });

            return (
              <React.Fragment>
                <svg width={width} height={height}>
                  <Group top={margin.top} left={margin.left}>
                    <BarStackHorizontal
                      data={data}
                      keys={keys}
                      height={yMax}
                      y={y}
                      xScale={xScale}
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
                      hideAxisLine={true}
                      hideTicks={true}
                      scale={yScale}
                      stroke={naColors.grey.dark}
                      tickStroke={naColors.grey.dark}
                      tickFormat={yFormat ? yFormat : null}
                      tickLabelProps={(value, index) => ({
                        fill: naColors.grey.dark,
                        fontSize: 12,
                        textAnchor: "end",
                        width: margin.left,
                        verticalAnchor: "middle"
                      })}
                    />
                    <AxisBottom
                      scale={xScale}
                      top={yMax}
                      stroke={naColors.grey.dark}
                      numTicks={
                        width - margin.left - margin.right < 300 ? 5 : 10
                      }
                      tickStroke={naColors.grey.dark}
                      tickFormat={xFormat ? xFormat : null}
                      tickLabelProps={(value, index) => ({
                        fill: naColors.grey.dark,
                        fontSize: 12,
                        textAnchor: "middle"
                      })}
                    />
                  </Group>
                  {width - margin.left - margin.right > 400 ? (
                    <React.Fragment>
                      <AnnotationBracket
                        x={width - margin.right}
                        y={margin.top + 10}
                        dy={85}
                        dx={20}
                        depth={25}
                        color={naColors.purple.medium}
                        editMode={false}
                        note={{
                          title: "Female-dominated",
                          align: "middle"
                        }}
                        subject={{ height: 175, type: "curly" }}
                      />
                      <AnnotationBracket
                        x={width - margin.right}
                        y={226}
                        dy={101}
                        dx={20}
                        depth={25}
                        color={naColors.grey.medium}
                        editMode={false}
                        note={{ title: "Neutral", align: "middle" }}
                        subject={{ height: 209, type: "curly" }}
                      />
                      <AnnotationBracket
                        x={width - margin.right}
                        y={436}
                        dy={84}
                        dx={20}
                        depth={25}
                        color={naColors.blue.dark}
                        editMode={false}
                        note={{
                          title: "Male-dominated",
                          align: "middle"
                        }}
                        subject={{ height: 174, type: "curly" }}
                      />
                    </React.Fragment>
                  ) : null}
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
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
                      {tooltipTemplate(tooltipData.data)}
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

export default withTooltip(Chart1);
