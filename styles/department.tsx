import Slider from "react-slick";
import styled from "styled-components";

export const CustomSlider = styled(Slider)`
  &.slick-slider {
    width: 100%;
    flex-direction: column;
    display: flex;
    gap: 48px;
    @media (max-width: 435px) {
      gap: 40px;
    }

    .slick-list {
      order: 1;

      .slick-track {
        display: flex;
        align-items: center;
        // max-height: 760px;
        max-height: 686px;
        @media (max-width: 435px) {
          max-height: 662px;
          align-items: start;
        }

        .slick-slide {
          opacity: 0.5;
          transform: scale(0.83);
          transition: all 0.5s ease-in;
          @media only screen and (max-width: 1281px) {
            transform: scale(0.1);
          }
          > div {
            // margin: 0 28px;
            > div {
              width: auto;
              height: auto;

              @media only screen and (min-width: 1024px) and (max-width: 1223px) {
                width: 900px !important;
              }
              @media only screen and (min-width: 1223px) and (max-width: 1323px) {
                width: 975px !important;
              }
              @media only screen and (min-width: 1323px) and (max-width: 1423px) {
                width: 770px !important;
              }
              @media only screen and (min-width: 1423px) and (max-width: 1523px) {
                width: 865px !important;
              }
              @media only screen and (min-width: 1523px) and (max-width: 1623px) {
                width: 840px !important;
              }
              @media only screen and (min-width: 1623px) and (max-width: 1723px) {
                width: 890px !important;
              }
              @media only screen and (min-width: 1723px) {
                width: 1280px !important;
              }
              // @media only screen and (min-width: 1723px) and (max-width: 1923px) {
              //   width: 960px !important;
              // }
              // @media only screen and (min-width: 1923px) and (max-width: 2123px) {
              //   width: 1020px !important;
              // }

              // @media only screen and (min-width: 2123px) and (max-width: 2423px) {
              //   width: 1280px !important;
              // }
              // @media only screen and (min-width: 2423px) {
              //   width: 1380px !important;
              // }
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
            }
          }
          &.slick-active {
            opacity: 1;
            // transform: scale(1);
            transform: scale(0.9);
            @media (max-width: 1500px) {
              transform: scale(1);
            }

            img {
              border-radius: 8px;
            }
          }
          :not(.slick-active) {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            img {
              filter: blur(2px);
              @media (max-width: 1024px) {
                display: none !important;
              }
              @media only screen and (min-width: 1123px) and (max-width: 1223px) {
                height: 280px !important;
              }
              @media only screen and (min-width: 1223px) and (max-width: 1323px) {
                height: 310px !important;
              }

              @media only screen and (min-width: 1323px) and (max-width: 1423px) {
                height: 360px !important;
              }

              @media only screen and (min-width: 1423px) and (max-width: 1523px) {
                height: 450px !important;
              }

              @media only screen and (min-width: 1523px) and (max-width: 1623px) {
                height: 380px !important;
              }
              @media only screen and (min-width: 1623px) and (max-width: 1723px) {
                height: 405px !important;
              }
              @media screen (min-width: 1723px) {
                height: 425px !important;
              }
              // @media only screen and (min-width: 1723px) and (max-width: 1923px) {
              //   height: 425px !important;
              // }
              // @media only screen and (min-width: 1923px) and (max-width: 2023px) {
              //   height: 450px !important;
              // }
              // @media only screen and (min-width: 2023px) and (max-width: 2223px) {
              //   height: 520px !important;
              // }
              // @media only screen and (min-width: 2223px) {
              //   height: 599px !important;
              // }
            }
          }
        }
      }
    }

    .slick-dots {
      // padding: 0 24px;
      padding: 0px;
      margin: 0 auto;
      max-width: 100%;
      width: fit-content;
      position: relative;
      order: 0;
      bottom: 0;

      > div {
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ul {
          background: #1d2939;
          border-radius: 32px;
          padding: 8px;
          white-space: nowrap;
          width: fit-content;
          > li {
            width: fit-content;
            height: fit-content;
            font-family: var(--inter);
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #ffffff;
            border-radius: 32px;
            margin: 0;
            + li {
              margin-left: 8px;
              @media (min-width: 1280px) {
                & {
                  margin-left: 16px;
                }
              }
            }
            > div {
              padding: 8px 16px;
              white-space: nowrap;
            }
            :hover,
            &.slick-active {
              color: black;
            }
            :hover {
              background: #d0d5dd;
            }
            &.slick-active {
              background: white;
              box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
            }
          }
        }
      }
    }
  }
`;
export const SectionWrapper = styled.section`
  > span {
    @media only screen and (max-width: 420px) {
      font-size: 14px;
      line-height: 20px;
    }
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #5964ff;
    margin: 0 auto;
    text-align: center;
    display: block;
  }
  h5 {
    @media only screen and (max-width: 420px) {
      font-size: 12px;
      line-height: 18px;
    }
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #0011fc;
    margin: 0 auto;
    text-align: center;
  }
  > h2 {
    // @media only screen and (max-width: 580px) {
    //   font-size: 40px;
    //   line-height: 48px;
    // }

    text-align: center;
    font-weight: 700;
    // font-size: 56px;
    // line-height: 72px;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 16px auto 24px auto;
    @media (min-width: 640px) {
      margin: 16px auto 32px auto;
    }
    // @media (min-width: 1024px) {
    //   font-size: 48px;
    //   line-height: 56px;
    // }
    // @media (min-width: 1280px) {
    //   font-size: 52px;
    //   line-height: 60px;
    // }
    // @media (min-width: 1536px) {
    //   font-size: 56px;
    //   line-height: 72px;
    // }
  }
  > h3 {
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 16px auto 24px auto;
    @media (min-width: 640px) {
      margin: 16px auto 32px auto;
    }
  }
  > p {
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 16px auto 24px auto;
    @media (min-width: 640px) {
      margin: 16px auto 32px auto;
    }
  }

  + section {
    // margin-top: 72px;
    margin-top: 96px;
  }
  @media (min-width: 640px) {
    + section {
      margin: 0;
    }
  }
`;

export const SliderNavigation = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #1d2939;
  border-radius: 32px;
  gap: 13px;
  margin: 0 auto;
  padding: 8px;
  width: fit-content;
  a {
    display: block;
    transition: all 0.2s ease-in;
    cursor: pointer;
    padding: 7px 15px;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    border-radius: 32px;
    border: 1px solid transparent;
    :hover,
    &.active {
      background: white;
      color: black;
    }
    &.active {
      border-color: #d0d5dd;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    }
  }

  @media (min-width: 1024px) {
    gap: 16px;
  }
`;

export const FaqWrapper = styled.div`
  border-top: 2px solid #101828;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  > div {
    cursor: pointer;
    padding: 40px 0;
    border-bottom: 2px solid #101828;
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
    @media (max-width: 435px) {
      padding: 24px 0;
    }
  }
  .question {
    font-family: var(--inter);
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 1024px) {
      font-size: 20px;
      line-height: 30px;
    }
    + p {
      margin-top: 16px;
    }
  }
`;

export const ContentWrapper = styled.div`
  transition: all 0.2s ease-in;
  padding: 0 20px;
  background-color: transparent;
  @media (min-width: 1280px) {
    padding: 0 120px;
  }
  @media (min-width: 768px) {
    padding: 0 60px;
  }
  > div,
  > section,
  > nav {
    max-width: 1280px;
    margin: 0 auto;
  }
  &.nav-is-scrolling {
    background: white;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
      drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    > nav {
      transition: all 0.2s ease-in;
      padding: 24px 0 !important;
    }
  }
  &.dropdown-open {
    background: white;
  }
`;

export const RoundBoxShadow = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  > svg {
    border-radius: 50%;
    box-shadow: 0 0 0 4px #e8eaff;
  }
`;

export const AdvanWrapper = styled.div`
  padding: 48px 0px 0px 0px;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  @media (max-width: 648px) {
    row-gap: 16px;
    padding: 30px 0px 0px 0px;
  }
  > div {
    padding: 16px;
    cursor: pointer;
    border: 2px solid #d9d9d9;
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
  }
  .question {
    font-family: var(--inter);
    font-weight: 700;
    font-size: 18px;
    // margin-bottom: 8px;
    line-height: 28px;
    color: #101828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 1024px) {
      font-size: 20px;
      line-height: 30px;
    }
    + p {
      margin-top: 16px;
    }
  }
`;

export const ProductAdvantageWrapper = styled.div`
  transition: all 0.2s ease-in;
  padding: 0 20px;
  @media (min-width: 1280px) {
    padding: 0 120px;
  }
  @media (min-width: 768px) {
    padding: 0 60px;
  }
  .is-box-open {
    background: #f5f5ff;
    border: 2px solid #101828;
    box-shadow: -2px 2px 0px #101828;
    border-radius: 12px;
  }
  > div,
  > section,
  > nav {
    max-width: 1280px;
    margin: 0 auto;
  }
`;
