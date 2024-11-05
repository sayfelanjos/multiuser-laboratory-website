import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./_scheduler.scss";

const calendars = [
  {
    calendarKey: "0",
    calendarTitle: "Análise Térmica e Reologia",
    calendarId: "efvtfrUCMceyZB4b6",
  },
  {
    calendarKey: "1",
    calendarTitle: "Apóio Técnico",
    calendarId: "Mcp16sQXcyS8NcTu5",
  },
  {
    calendarKey: "2",
    calendarTitle: "Charpy",
    calendarId: "CApvLZ7oBXSQ9zos6",
  },
  {
    calendarKey: "3",
    calendarTitle: "Dureza e Metalografia",
    calendarId: "7wKZUQeeX4REKfVP7",
  },
  {
    calendarKey: "4",
    calendarTitle: "FT-IR",
    calendarId: "EWrgre5rd3aXjbN1A",
  },
  {
    calendarKey: "5",
    calendarTitle: "Impressão 3D",
    calendarId: "4Lxzw4hsfu9ec6vn6",
  },
  {
    calendarKey: "6",
    calendarTitle: "MEV",
    calendarId: "Wu7T1wmY9gHE961j8",
  },
  {
    calendarKey: "7",
    calendarTitle: "MTS",
    calendarId: "DkSLgKdF92DGGMBo6",
  },
  {
    calendarKey: "8",
    calendarTitle: "Treinamento",
    calendarId: "BQxHFrmnJ5FdyLhx6",
  },
  {
    calendarKey: "9",
    calendarTitle: "Microscopia Ótica",
    calendarId: "1DwCpfPmwMDDwpfh9",
  },
];

const Scheduler = () => {
  return (
    <Container className="h-100 p-2 overflow-y-auto">
      <Tabs
        defaultActiveKey="0"
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
              title={calendar.calendarTitle}
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
