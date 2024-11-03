import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./_scheduler.scss";

const Scheduler = () => {
  return (
    <Container className="h-100 p-2 overflow-y-auto">
      <Tabs
        defaultActiveKey="mechanic-test01"
        transition
        id="noanim-tab-example"
        className="mb-3"
        fill
      >
        <Tab
          className="h-100"
          eventKey="mechanic-test03"
          title="Análise Térmica e Reologia"
        >
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/efvtfrUCMceyZB4b6"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab className="h-100" eventKey="mechanic-test06" title="Charpy">
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/CApvLZ7oBXSQ9zos6"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab
          className="h-100"
          eventKey="mechanic-test04"
          title="Dureza, Microcopia Ótica e Metalografia"
        >
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/7wKZUQeeX4REKfVP7"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab className="h-100" eventKey="mechanic-test02" title="FT-IR">
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/EWrgre5rd3aXjbN1A"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab className="h-100" eventKey="mechanic-test07" title="Impressão 3D">
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/4Lxzw4hsfu9ec6vn6"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab className="h-100" eventKey="mechanic-test05" title="MEV">
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/Wu7T1wmY9gHE961j8"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
        <Tab className="h-100" eventKey="mechanic-test01" title="MTS">
          <Container className="calendar__ctn">
            <iframe
              src="https://calendar.app.google/DkSLgKdF92DGGMBo6"
              style={{ border: 0 }}
              width="100%"
              height="100%"
            ></iframe>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Scheduler;
