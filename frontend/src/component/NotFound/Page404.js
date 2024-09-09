import React, { useEffect } from "react";
import styled from "styled-components";
import Parallax from "parallax-js";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  useEffect(() => {
    const scene = document.getElementById("scene");
    if (scene) {
      new Parallax(scene);
    }
  }, []);

  return (
    <Root>
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                As of now, the Server is being upgraded for enhanced
                performance,. Please contact Admin for further assistance.
              </p>
              <NavLink to={"/login"}>
                <button>GO TO HOME PAGE</button>
              </NavLink>
            </article>
          </div>
        </div>
      </section>
    </Root>
  );
};

export default Page404;

const Root = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

  * {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 0;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    color: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    height: auto;
    font-family: "Barlow", sans-serif;
    background: #695681;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-x: hidden;

    .container {
      margin: 0 auto;
      transition: all 0.4s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .scene {
        position: absolute;
        width: 100vw;
        height: 100vh;
        vertical-align: middle;
      }

      .one,
      .two,
      .three,
      .circle,
      .p404 {
        width: 60%;
        height: 60%;
        top: 20% !important;
        left: 20% !important;
        min-width: 400px;
        min-height: 400px;

        .content {
          width: 600px;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

          @keyframes content {
            0% {
              width: 0;
            }
          }

          .piece {
            width: 200px;
            height: 80px;
            display: flex;
            position: absolute;
            border-radius: 80px;
            z-index: 1;
            animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;

            @keyframes pieceLeft {
              0% {
              }

              50% {
                left: 80%;
                width: 10%;
              }

              100% {
              }
            }

            @keyframes pieceRight {
              0% {
              }

              50% {
                right: 80%;
                width: 10%;
              }

              100% {
              }
            }
          }
        }

        @media screen and (max-width: 799px) {
          width: 90%;
          height: 90%;
          top: 5% !important;
          left: 5% !important;
          min-width: 280px;
          min-height: 280px;
        }

        @media screen and (max-height: 660px) {
          min-width: 280px;
          min-height: 280px;
          width: 60%;
          height: 60%;
          top: 20% !important;
          left: 20% !important;
        }
      }

      .text {
        width: 60%;
        height: 40%;
        min-width: 400px;
        min-height: 500px;
        position: absolute;
        margin: 40px 0;
        animation: text 0.6s 1.8s ease backwards;

        @keyframes text {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
        }

        @media screen and (max-width: 799px) {
          min-height: 400px;
          height: 80%;
        }

        article {
          width: 400px;
          position: absolute;
          bottom: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);

          @media screen and (max-width: 799px) {
            width: 100%;
          }

          p {
            color: white;
            font-size: 18px;
            letter-spacing: 0.6px;
            margin-bottom: 40px;
            text-shadow: 6px 6px 10px #32243e;
          }

          button {
            height: 40px;
            padding: 0 30px;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0px 15px 20px rgba(54, 24, 79, 0.5);
            z-index: 3;
            color: #695681;
            background-color: white;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 12px;
            transition: all 0.3s ease;

            &:hover {
              box-shadow: 0px 10px 10px -10px rgba(54, 24, 79, 0.5);
              transform: translateY(5px);
              background: #fb8a8a;
              color: white;
            }
          }
        }
      }

      .p404 {
        font-size: 200px;
        font-weight: 700;
        letter-spacing: 4px;
        color: white;
        display: flex !important;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 2;
        animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
        animation-delay: 1.2s;

        @media screen and (max-width: 799px) {
          font-size: 100px;
        }

        @keyframes anime404 {
          0% {
            opacity: 0;
            transform: scale(10) skew(20deg, 20deg);
          }
        }

        &:nth-of-type(2) {
          color: #36184f;
          z-index: 1;
          animation-delay: 1s;
          filter: blur(10px);
          opacity: 0.8;
        }
      }

      .circle {
        position: absolute;

        &:before {
          content: "";
          position: absolute;
          width: 800px;
          height: 800px;
          background-color: rgba(54, 24, 79, 0.2);
          border-radius: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 5px 20px 40px rgba(54, 24, 79, 0.25),
            inset 5px 0px 5px rgba(50, 36, 62, 0.3),
            inset 5px 5px 20px rgba(50, 36, 62, 0.25),
            2px 2px 5px rgba(white, 0.2);
          animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

          @keyframes circle {
            0% {
              width: 0;
              height: 0;
            }
          }

          @media screen and (max-width: 799px) {
            width: 400px;
            height: 400px;
          }
        }
      }

      .one {
        .content {
          &:before {
            content: "";
            position: absolute;
            width: 600px;
            height: 600px;
            background-color: rgba(54, 24, 79, 0.3);
            border-radius: 100%;
            box-shadow: inset 5px 20px 40px rgba(54, 24, 79, 0.25),
              inset 5px 0px 5px rgba(50, 36, 62, 0.3),
              inset 5px 5px 20px rgba(50, 36, 62, 0.25),
              2px 2px 5px rgba(white, 0.2);
            animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;

            @media screen and (max-width: 799px) {
              width: 300px;
              height: 300px;
            }
          }

          .piece {
            background: linear-gradient(90deg, #8077ea 13.7%, #eb73ff 94.65%);

            &:nth-child(1) {
              right: 15%;
              top: 18%;
              height: 30px;
              width: 120px;
              animation-delay: 0.5s;
              animation-name: pieceRight;
            }

            &:nth-child(2) {
              left: 15%;
              top: 45%;
              width: 150px;
              height: 50px;
              animation-delay: 1s;
              animation-name: pieceLeft;
            }

            &:nth-child(3) {
              left: 10%;
              top: 75%;
              height: 20px;
              width: 70px;
              animation-delay: 1.5s;
              animation-name: pieceLeft;
            }
          }
        }
      }

      .two {
        .content {
          .piece {
            background: linear-gradient(90deg, #ffedc0 0%, #ff9d87 100%);

            &:nth-child(1) {
              left: 0%;
              top: 25%;
              height: 40px;
              width: 120px;
              animation-delay: 2s;
              animation-name: pieceLeft;
            }

            &:nth-child(2) {
              right: 15%;
              top: 35%;
              width: 180px;
              height: 50px;
              animation-delay: 2.5s;
              animation-name: pieceRight;
            }

            &:nth-child(3) {
              right: 10%;
              top: 80%;
              height: 20px;
              width: 160px;
              animation-delay: 3s;
              animation-name: pieceRight;
            }
          }
        }
      }

      .three {
        .content {
          .piece {
            background: #fb8a8a;

            &:nth-child(1) {
              left: 25%;
              top: 35%;
              height: 20px;
              width: 80px;
              animation-name: pieceLeft;
              animation-delay: 3.5s;
            }

            &:nth-child(2) {
              right: 10%;
              top: 55%;
              width: 140px;
              height: 40px;
              animation-name: pieceRight;
              animation-delay: 4s;
            }

            &:nth-child(3) {
              left: 40%;
              top: 68%;
              height: 20px;
              width: 80px;
              animation-name: pieceLeft;
              animation-delay: 4.5s;
            }
          }
        }
      }
    }
  }
`;
