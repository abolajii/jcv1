import styled, { createGlobalStyle } from "styled-components";

import React from "react";

// Global style to hide overflow on the body for mobile screens
const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow: hidden;
    }
  }
`;

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 70px; /* Height of MobileSidebar */
`;

const MobileSidebar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Scrollable>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sit
          eligendi, iure quaerat, voluptates magnam excepturi natus quod, sed
          saepe consequuntur neque deserunt explicabo ullam reprehenderit. Modi
          illo, minima earum delectus nostrum provident laudantium consequuntur
          architecto deserunt aliquid laboriosam. Eum quia veritatis nulla in.
          Eaque asperiores quo deserunt corporis quaerat. Deserunt tempora a
          tempore adipisci et. Explicabo, ullam. Ea, nisi sed voluptatibus,
          voluptatum blanditiis alias distinctio ab ut eum assumenda consequatur
          et? Doloribus ullam explicabo repellat praesentium sapiente quasi
          delectus corrupti! Aut similique modi voluptatem animi placeat
          molestiae ea aperiam, corporis accusantium quasi harum dolorum nam
          sint, porro nemo corrupti? Labore dolore distinctio harum odit ratione
          fugit amet voluptas magni vitae, voluptates veritatis voluptatem sit
          saepe itaque asperiores optio repellendus, porro animi quia debitis
          rerum enim impedit vel. Consectetur, quod. Debitis vel officiis,
          itaque suscipit atque, necessitatibus consequuntur aperiam nobis nam
          eligendi facere? Ad qui distinctio dolorem voluptate tempore
          perferendis illum quos quas voluptatibus blanditiis commodi soluta,
          fugit voluptatem maiores. Sequi error repellat quidem commodi
          recusandae soluta aliquid explicabo corrupti omnis beatae, hic
          accusantium nemo qui sint fugiat quo amet tempora voluptatum
          similique. Iste veniam natus consequuntur labore. Tenetur neque eos,
          quidem recusandae fugiat blanditiis illo nostrum unde repudiandae quis
          temporibus eum ipsum perspiciatis tempora qui laborum esse odit
          similique. Suscipit pariatur veniam eaque obcaecati cupiditate alias
          sint nisi adipisci, illo consequuntur maiores, in autem asperiores
          dolore iusto fuga itaque voluptas amet ipsam sit. Doloremque, quae ut
          qui repellendus dignissimos quaerat ratione ducimus molestiae omnis
          nobis libero modi, asperiores eveniet praesentium dolor. Voluptatum
          dolore id earum laboriosam magni esse aliquam corrupti, sit ea
          adipisci! Fugiat, sint itaque! Necessitatibus expedita assumenda
          ipsum, aliquam quae fuga sequi architecto quia nostrum officia eveniet
          ea rerum, omnis accusantium quas doloremque at tenetur reiciendis
          harum porro labore cupiditate beatae? Incidunt accusamus dolorem
          adipisci. Architecto eius, maxime optio dolorum officia ipsum facere
          odit nostrum sit quaerat at mollitia deserunt iste incidunt impedit
          ipsam fugiat amet aut eaque alias reiciendis possimus sed! Eaque nulla
          vel similique dolores necessitatibus in consequatur velit ex
          repudiandae distinctio repellat perferendis aut, officia pariatur ab,
          molestiae cum doloribus enim quibusdam iusto obcaecati omnis odio a?
          Eaque, quasi. Corporis dolores laudantium omnis quidem aliquid? Quidem
          consequatur reprehenderit libero accusamus, blanditiis porro suscipit
          dolore reiciendis maxime quo sequi assumenda expedita! Debitis aperiam
          fugiat voluptatibus nihil facere exercitationem ipsam! Eum nemo cum
          vel distinctio soluta sapiente sint, nisi rerum omnis magnam optio
          sunt quas, accusantium quis modi provident vero voluptatem
          consequatur. Corrupti, fuga aut sed dolorem laudantium, earum expedita
          quo nostrum autem molestiae facilis eveniet, hic aperiam incidunt. Et
          incidunt vitae recusandae, culpa ullam excepturi quis optio eligendi
          saepe impedit cupiditate ad dolores debitis enim assumenda sed
          repellat eos. Quod qui sint voluptates, atque libero repellendus eius
          fugit aut eum rerum perspiciatis delectus quo, ipsam dicta, quisquam
          inventore ratione voluptatum corporis. Quisquam sunt commodi quos
          architecto similique, eligendi eum quo veniam dolorem, eveniet aliquam
          nostrum vero blanditiis labore illum voluptatem officiis ullam eos
          quia doloribus! Suscipit reiciendis labore cupiditate, quam dolorum
          eos iste voluptatum voluptates?
        </Scrollable>
        <MobileSidebar />
      </Container>
    </>
  );
};

export default App;
