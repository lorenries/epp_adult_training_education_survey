import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { json } from "d3-request";
import { format } from "d3-format";
import { nest } from "d3-collection";
import {
  HorizontalStackedBar,
  HorizontalStackedBarWithTooltip
} from "./charts/HorizontalStackedBar";
import { AnnotationBracket } from "react-annotation";
import { colors } from "./lib/colors";
import Chart1 from "./Chart1";

const settings = {
  chart_1: {
    init: chart_1
  },
  chart_2: {
    init: chart_2
  },
  chart_3: {
    init: chart_3
  },
  computer_occupations: {
    init: computer_occupations
  },
  construction_repair: {
    init: construction_repair
  },
  healthcare: {
    init: healthcare
  },
  education_library: {
    init: education_library
  }
};

window.renderDataViz = function(el) {
  const id = el.getAttribute("id");
  json(
    "http://na-data-projects.s3.amazonaws.com/data/epp/adult_training_education_survey.json"
  ).then(data => {
    const meta = nest()
      .key(d => d.chart)
      .object(data.meta);
    settings[id].init(el, id, data, meta);
  });
};

function chart_2(el, id, data, meta) {}
function chart_3(el, id, data, meta) {}
function computer_occupations(el, id, data, meta) {
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBar
      data={data[id]}
      title={meta[id][0].title}
      source={meta[id][0].source}
      height={200}
      x={d => d.value}
      xFormat={val => format(".0%")(val)}
      y={d => d["Nondegree Credential Type"]}
      keys={Object.keys(data[id][0]).filter(
        val => val !== "Nondegree Credential Type"
      )}
      margin={{ top: 40, left: 135, right: 15, bottom: 40 }}
      colors={[
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light,
        colors.red.light
      ]}
    />,
    el
  );
}
function construction_repair(el, id, data, meta) {
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBar
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
      margin={{ top: 40, left: 135, right: 15, bottom: 40 }}
      colors={[
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light,
        colors.red.light
      ]}
    />,
    el
  );
}
function healthcare(el, id, data, meta) {
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBar
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
      margin={{ top: 40, left: 135, right: 15, bottom: 40 }}
      colors={[
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light,
        colors.red.light
      ]}
    />,
    el
  );
}
function education_library(el, id, data, meta) {
  el.classList.add("mw-650");
  ReactDOM.render(
    <HorizontalStackedBar
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
      margin={{ top: 40, left: 135, right: 15, bottom: 40 }}
      colors={[
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light,
        colors.red.light
      ]}
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
      margin={{ top: 40, left: 210, right: 150, bottom: 40 }}
      colors={[colors.purple.medium, colors.blue.dark]}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}
