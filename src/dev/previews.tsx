import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import QuoteRequestForm from "../components/QuoteRequestForm";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/QuoteRequestForm">
        <QuoteRequestForm />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
