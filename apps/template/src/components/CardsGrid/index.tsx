import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { cardsData } from "./cardsData";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import Divider from "antd/lib/divider";
import "./_cards-grid.scss";

const CardsGrid = () => {
  return (
    <div className="cards-grid__wrapper">
      {cardsData.map((card) => {
        return (
          <div key={card.id}>
            <Link to={card.link} className="text-decoration-none">
              <Card className="card-grid__item" body={false}>
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="link-primary fs-6">
                      {card.title}
                    </Card.Title>
                    <span className="link-primary">
                      <ArrowRightIcon />
                    </span>
                  </div>
                  <Divider className="border-primary" />
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsGrid;
