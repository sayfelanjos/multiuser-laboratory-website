import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./_scheduler.scss";

const calendars = [
  {
    calendarKey: "0",
    calendarName: "Análise Térmica e Reologia",
    calendarId: "efvtfrUCMceyZB4b6",
  },
  {
    calendarKey: "1",
    calendarName: "Apoio (DEMM)",
    calendarId: "Mcp16sQXcyS8NcTu5",
  },
  {
    calendarKey: "2",
    calendarName: "Charpy",
    calendarId: "CApvLZ7oBXSQ9zos6",
  },
  {
    calendarKey: "3",
    calendarName: "Dureza, Metalografia",
    calendarId: "7wKZUQeeX4REKfVP7",
  },
  {
    calendarKey: "4",
    calendarName: "FT-IR",
    calendarId: "ZEvAhqmKTDXDKpyQ6",
  },
  {
    calendarKey: "5",
    calendarName: "Impressão 3D",
    calendarId: "4Lxzw4hsfu9ec6vn6",
  },
  {
    calendarKey: "9",
    calendarName: "Microscopia Ótica",
    calendarId: "1DwCpfPmwMDDwpfh9",
  },
  {
    calendarKey: "6",
    calendarName: "MEV",
    calendarId: "Wu7T1wmY9gHE961j8",
  },
  {
    calendarKey: "7",
    calendarName: "MTS",
    calendarId: "DkSLgKdF92DGGMBo6",
  },

  {
    calendarKey: "8",
    calendarName: "Treinamento",
    calendarId: "BQxHFrmnJ5FdyLhx6",
  },
];

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
        {calendars.map((calendar) => {
          return (
            <Tab
              key={calendar.calendarKey}
              className="h-100"
              eventKey={calendar.calendarKey}
              title={calendar.calendarName}
            >
              <Container className="calendar__ctn">
                <iframe
                  src={`https://calendar.app.google/${calendar.calendarId}`}
                  style={{ border: 0 }}
                  width="100%"
                  height="100%"
                ></iframe>
              </Container>
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default Scheduler;
