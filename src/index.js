import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { json } from "d3-fetch";
import { format } from "d3-format";
import { nest } from "d3-collection";
import {
  HorizontalStackedBar,
  HorizontalStackedBarWithTooltip
} from "./charts/HorizontalStackedBar";
import {
  VerticalGroupedBar,
  VerticalGroupedBarWithTooltip
} from "./charts/VerticalGroupedBar";
import { AnnotationBracket } from "react-annotation";
import { colors } from "./lib/colors";
import Chart1 from "./Chart1";

const settings = {
  viz__chart_1: {
    init: chart_1
  },
  viz__chart_2: {
    init: chart_2
  },
  viz__chart_3: {
    init: chart_3
  },
  viz__computer_occupations: {
    init: computer_occupations
  },
  viz__construction_repair: {
    init: construction_repair
  },
  viz__healthcare: {
    init: healthcare
  },
  viz__education_library: {
    init: education_library
  },
  viz__chart_5: {
    init: chart_5
  }
};

window.renderDataViz = function(el) {
  const id = el.getAttribute("id");
  json(
    "https://na-data-projects.s3.amazonaws.com/data/epp/adult_training_education_survey.json"
  ).then(data => {
    const meta = nest()
      .key(d => d.chart)
      .object(data.meta);
    settings[id].init(el, id, data, meta);
    console.log("data loaded", data, id);
  });
};

function chart_5(el, id, data, meta) {
  console.log("chart function called", id);
  el.classList.add("mw-650");
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d.x}</h1>
        </div>
        <div className="tooltip__category">
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">Gender:</span>
            <span className="tooltip__category__list-item__value">{d.key}</span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Share of Nondegree Credential Holders:
            </span>
            <span className="tooltip__category__list-item__value">
              {format(".0%")(+d.value)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  ReactDOM.render(
    <VerticalGroupedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={400}
      x={d => d["Preparation Type"]}
      xFormat={val => val}
      yFormat={val => format(".0%")(val)}
      y={d => d.value}
      yAxisLabel="Share of Nondegree Credential Holders"
      keys={Object.keys(data[id][0]).filter(val => val !== "Preparation Type")}
      margin={{ top: 40, left: 60, right: 0, bottom: 50 }}
      colors={[colors.purple.medium, colors.blue.dark]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}

function chart_2(el, id, data, meta) {
  el.classList.add("mw-650");
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__category">
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Credential Type:
            </span>
            <span className="tooltip__category__list-item__value">{d.x}</span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">Gender:</span>
            <span className="tooltip__category__list-item__value">{d.key}</span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Employment Rate:
            </span>
            <span className="tooltip__category__list-item__value">
              {format(".0%")(+d.value)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  ReactDOM.render(
    <VerticalGroupedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={400}
      x={d => d["Credential Type"]}
      xFormat={val => val}
      yFormat={val => format(".0%")(val)}
      y={d => d.value}
      yAxisLabel="Employment Rate"
      keys={Object.keys(data[id][0]).filter(val => val !== "Credential Type")}
      margin={{ top: 40, left: 60, right: 0, bottom: 30 }}
      colors={[colors.purple.medium, colors.blue.dark]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
function chart_3(el, id, data, meta) {
  el.classList.add("mw-650");
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__category">
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Occupation:
            </span>
            <span className="tooltip__category__list-item__value">{d.x}</span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Credential Type:
            </span>
            <span className="tooltip__category__list-item__value">{d.key}</span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Employment Rate:
            </span>
            <span className="tooltip__category__list-item__value">
              {format(".0%")(+d.value)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  ReactDOM.render(
    <VerticalGroupedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={400}
      x={d => d["Occupation"]}
      xFormat={val => val}
      yFormat={val => format(".0%")(val)}
      y={d => d.value}
      yAxisLabel="Employment Rate"
      keys={Object.keys(data[id][0]).filter(val => val !== "Occupation")}
      margin={{ top: 40, left: 60, right: 0, bottom: 85 }}
      colors={[
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light,
        colors.red.light
      ]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
function computer_occupations(el, id, data, meta) {
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d.y}</h1>
        </div>
        <div className="tooltip__category">
          {Object.keys(d.data).map(
            val =>
              val != "Nondegree Credential Type" ? (
                <div className="tooltip__category__list-item">
                  <span className="tooltip__category__list-item__label">
                    {val}:
                  </span>
                  <span className="tooltip__category__list-item__value">
                    {format(".0%")(d.data[val])}
                  </span>
                </div>
              ) : null
          )}
        </div>
      </div>
    </div>
  );
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={250}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Nondegree Credential Type"]}
      keys={Object.keys(data[id][0]).filter(
        val => val !== "Nondegree Credential Type"
      )}
      margin={{ top: 40, left: 150, right: 15, bottom: 40 }}
      colors={[
        colors.red.dark,
        colors.red.light,
        colors.turquoise.light,
        colors.turquoise.medium,
        colors.turquoise.dark
      ]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
function construction_repair(el, id, data, meta) {
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d.y}</h1>
        </div>
        <div className="tooltip__category">
          {Object.keys(d.data).map(
            val =>
              val != "Nondegree Credential Type" ? (
                <div className="tooltip__category__list-item">
                  <span className="tooltip__category__list-item__label">
                    {val}:
                  </span>
                  <span className="tooltip__category__list-item__value">
                    {format(".0%")(d.data[val])}
                  </span>
                </div>
              ) : null
          )}
        </div>
      </div>
    </div>
  );
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      width={850}
      height={250}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Nondegree Credential Type"]}
      keys={Object.keys(data[id][0]).filter(
        val => val !== "Nondegree Credential Type"
      )}
      margin={{ top: 40, left: 150, right: 15, bottom: 40 }}
      colors={[
        colors.red.dark,
        colors.red.light,
        colors.turquoise.light,
        colors.turquoise.medium,
        colors.turquoise.dark
      ]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
function healthcare(el, id, data, meta) {
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d.y}</h1>
        </div>
        <div className="tooltip__category">
          {Object.keys(d.data).map(
            val =>
              val != "Nondegree Credential Type" ? (
                <div className="tooltip__category__list-item">
                  <span className="tooltip__category__list-item__label">
                    {val}:
                  </span>
                  <span className="tooltip__category__list-item__value">
                    {format(".0%")(d.data[val])}
                  </span>
                </div>
              ) : null
          )}
        </div>
      </div>
    </div>
  );
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      width={850}
      height={250}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Nondegree Credential Type"]}
      keys={Object.keys(data[id][0]).filter(
        val => val !== "Nondegree Credential Type"
      )}
      margin={{ top: 40, left: 150, right: 15, bottom: 40 }}
      colors={[
        colors.red.dark,
        colors.red.light,
        colors.turquoise.light,
        colors.turquoise.medium,
        colors.turquoise.dark
      ]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
function education_library(el, id, data, meta) {
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d.y}</h1>
        </div>
        <div className="tooltip__category">
          {Object.keys(d.data).map(
            val =>
              val != "Nondegree Credential Type" ? (
                <div className="tooltip__category__list-item">
                  <span className="tooltip__category__list-item__label">
                    {val}:
                  </span>
                  <span className="tooltip__category__list-item__value">
                    {format(".0%")(d.data[val])}
                  </span>
                </div>
              ) : null
          )}
        </div>
      </div>
    </div>
  );
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBarWithTooltip
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      width={850}
      height={250}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Nondegree Credential Type"]}
      keys={Object.keys(data[id][0]).filter(
        val => val !== "Nondegree Credential Type"
      )}
      margin={{ top: 40, left: 150, right: 15, bottom: 40 }}
      colors={[
        colors.red.dark,
        colors.red.light,
        colors.turquoise.light,
        colors.turquoise.medium,
        colors.turquoise.dark
      ]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}

function chart_1(el, id, data, meta) {
  const tooltipTemplate = d => (
    <div>
      <div>
        <div className="tooltip__title-container">
          <h1 className="tooltip__title">{d["Occupation"]}</h1>
        </div>
        <div className="tooltip__category">
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Percent Female:
            </span>
            <span className="tooltip__category__list-item__value">
              {format(".0%")(d["Women"])}
            </span>
          </div>
          <div className="tooltip__category__list-item">
            <span className="tooltip__category__list-item__label">
              Percent Male:
            </span>
            <span className="tooltip__category__list-item__value">
              {format(".0%")(d["Men"])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  ReactDOM.render(
    <Chart1
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={660}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Occupation"]}
      keys={Object.keys(data[id][0]).filter(val => val !== "Occupation")}
      margin={{ top: 40, left: 210, right: 160, bottom: 40 }}
      colors={[colors.purple.medium, colors.blue.dark]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
