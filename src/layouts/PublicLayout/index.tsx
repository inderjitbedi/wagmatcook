import React from "react";
import FooterLayout from "../footer";

const PublicLayout = ({ component: Component }:any) => (
  <>
    <main role="main">
      <Component/>
      <FooterLayout></FooterLayout>
    </main>
  </>
);

export default PublicLayout;
