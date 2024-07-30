import React from "react";

function About() {
  return (
    <div>
      <h4>
        CarShop is your one-stop shop for all your automotive needs. We are
        dedicated to providing our customers with a seamless and enjoyable car
        buying experience, from browsing our extensive inventory to securing
        financing and driving off in your dream car.
      </h4>

      <div className="mt-6 mb-56 flex max-w-64 gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbpRQ_raDFg3LCh2UlHyPQdEryO0KhOG6TbS_0glf4WMPaV02pAmaup4wdLkRdc9nyTas&usqp=CAU"
          alt=""
        />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDYh4_oz0M98TgdSuogezgZ4Eiv6m6GJ-uJESyTL5YjJJaYPJoR53MjSGhAhxoash1oc&usqp=CAU" alt="" />
        <img src="https://bmw.scene7.com/is/image/BMW/BMW-Finance-Promotion-v2?wid=1504&hei=853" alt="" />
      </div>
    </div>
  );
}

export default About;
