import { useState } from "react";
//import { useParams } from "react-router-dom";
import styled from "styled-components";

const Instructions = () => {
  //let params = useParams();
  const [details] = useState({
    title: "Sample Recipe",
    image: "https://via.placeholder.com/100",
    instructions: "<li>Step 1: Mix </li><li>Step 2: Bake</li>",
    extendedIngredients: [
      { id: 1, original: "1 ingeredient" },
      { id: 2, original: "2 cup" },
      { id: 3, original: "1 choclate" }
    ]
  });
  const [activeTab, setActiveTab] = useState("instructions");

  return (
    <DetailWrapper>
      <div style={{ flex: 1 }}>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div style={{ marginTop: 30 }}>
            <ol dangerouslySetInnerHTML={{ __html: details.instructions }}></ol>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ol style={{ marginTop: 30 }}>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ol>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 5rem;
  .active {
    background: #282c34;
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  flex: 1;
`;

export default Instructions;
