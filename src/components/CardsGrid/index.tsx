import React from "react";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
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
          <Card key={card.id} className="card-grid__item" body={false}>
            <Link to={card.link} className="text-decoration-none">
              <Ratio className="cards-grid__ratio-8x5">
                <Card.Img variant="top" src={card.image} />
              </Ratio>
              <Card.Body>
                <Card.Title className="link-primary fs-6 d-flex justify-content-between">
                  <span>{card.title}</span>
                  <span className="link-primary">
                    <ArrowRightIcon />
                  </span>
                </Card.Title>
                <Divider className="border-primary" />
                <Card.Text className="text-truncate text-wrap text-black">
                  {card.text.slice(0, 100).replace("\n", " - ") + "…"}
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default CardsGrid;
