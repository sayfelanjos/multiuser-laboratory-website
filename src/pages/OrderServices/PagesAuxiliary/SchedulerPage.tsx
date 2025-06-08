import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import "./_scheduler.scss";
import mapServices from "../MapServices/MapServices";
import { useNavigate } from "react-router-dom";


const SchedulerPage = () => {
  const navigate = useNavigate();
  const handleSelect = (calendarKey: string | null) => {
    const selected = mapServices.find(service => service.calendarKey === calendarKey);
    if(selected) {navigate("/app/order-service", {state: { calendarName: selected.calendarName },});  
    }
  };
    return (
      <Container className="h-100 p-2 overflow-y-auto">
        <Tabs
          defaultActiveKey="mechanic-test01"
          transition
          id="noanim-tab-example"
          className="mb-3"
          onSelect={handleSelect}
          fill
        >
          {mapServices.map((mapServices) => {
            return (
              <Tab
                key={mapServices.calendarKey}
                className="h-100"
                eventKey={mapServices.calendarKey}
                title={mapServices.calendarName}
              >
                {/* <Container className="calendar__ctn">
                  <iframe
                    src={`https://calendar.app.google/${mapServices.calendarId}`}
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                  ></iframe>
                </Container> */}
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    );
  };
  
  export default SchedulerPage;