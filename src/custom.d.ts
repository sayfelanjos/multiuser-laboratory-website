// Declaration for SCSS files
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Declaration for CSS files
declare module "react-phone-number-input/style.css";
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
