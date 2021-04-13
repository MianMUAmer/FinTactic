import React from "react";
import { Link } from "react-router-dom";
import LeftPic from "../Home/hero.png";
import eduVideoPic from "../../images/eduVideos.svg";
import vizDataPic from "../../images/vizDataPic.svg";
import corrPic from "../../images/correlationPic.svg";
import mlPic from "../../images/MLPic.svg";
import dashboardPic from "../../images/dashboardPic.svg";
import bookmarkPic from "../../images/bookmarkPic.svg";
import reportsPic from "../../images/reportsPic.svg";
import "./css/contactForm.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="Home"
        className="leading-normal tracking-normal text-white gradient"
      >
        <nav
          id="header"
          className="fixed w-full z-30 top-0"
          style={{
            backgroundColor: "#f4f4f5",
            borderBottom: "1px solid #a3a3a3",
          }}
        >
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div className="pl-4 flex items-center">
              <a
                style={{
                  color: "black",
                }}
                className="toggleColour text-black no-underline text-2xl lg:text-4xl"
                href="#"
              >
                {/*Icon from: http://www.potlabicons.com/ */}
                <svg
                  className="h-8 fill-current inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.005 512.005"
                >
                  <rect
                    fill="#2a2a31"
                    x="16.539"
                    y="425.626"
                    width="479.767"
                    height="50.502"
                    transform="matrix(1,0,0,1,0,0)"
                  />
                  <path
                    className="plane-take-off"
                    d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
                  />
                </svg>
                FinTacTic
              </a>
            </div>

            <div style={{ display: "flex" }}>
              <a
                className="text-black no-underline text-1xl lg:text-1xl pl-4 flex items-center"
                style={{
                  marginRight: 18,
                  color: "black",
                }}
              >
                Product
              </a>
              <a
                className="text-black no-underline text-1xl lg:text-1xl pl-4 flex items-center"
                style={{
                  marginRight: 18,
                  color: "black",
                }}
              >
                Features
              </a>
              <a
                className="text-black no-underline text-1xl lg:text-1xl pl-4 flex items-center"
                style={{
                  marginRight: 18,
                  color: "black",
                }}
              >
                Contact
              </a>
              <Link
                style={{
                  marginRight: 20,
                  color: "black",
                }}
                className="text-black no-underline text-1xl lg:text-1xl pl-4 flex items-center"
                to="login"
              >
                Login
              </Link>
              <Link
                style={{
                  border: "1px solid #5f5bf5",
                  padding: 6,
                  borderRadius: 15,
                  width: 80,
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#5f5bf5",
                }}
                className="toggleColour text-black no-underline text-1xl lg:text-1xl items-center"
                to="register"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
        {/*Hero*/}
        <div className="pt-24">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/*Left Col*/}
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full">
                Develop Financial TacTics
              </p>
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Learn, Implement and Invest Wisely!
              </h1>
              <p className="leading-normal text-2xl mb-8">
                Sub-hero message, not too long and not too short. Make it just
                right!
              </p>
              <Link
                style={{
                  padding: 5,
                  borderRadius: 15,
                  width: "40%",
                  height: "80%",
                  textAlign: "center",
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f5",
                }}
                className="mx-auto text-black no-underline text-1xl lg:text-1xl items-center my-6 py-8 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                to="register"
              >
                Sign Up !
              </Link>
            </div>
            {/*Right Col*/}
            <div className="w-full md:w-3/5 py-6 text-center">
              <img className="w-full md:w-4/5 z-50" src={LeftPic} />
            </div>
          </div>
        </div>
        <div className="relative -mt-12 lg:-mt-24">
          <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <g
                transform="translate(-2.000000, 44.000000)"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                />
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                />
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  opacity="0.200000003"
                />
              </g>
              <g
                transform="translate(-4.000000, 76.000000)"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z" />
              </g>
            </g>
          </svg>
        </div>
        <section className="bg-white border-b py-8">
          <div className="container max-w-5xl mx-auto m-8">
            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              What You'll Get?
            </h1>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/2 p-6">
                <br />
                <br />
                <br />
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Educational Videos
                </h3>
                <p className="text-gray-600 mb-8">
                  We have created whiteboard educational videos on various
                  financial concepts, indicators (Bollinger Bands, RSI, MACD,
                  etc) and popular graph types used in trading. You can learn
                  these concepts and implement this acquired knowledge on our
                  platform. Also on Youtube.
                  <br />
                  <br />
                </p>
              </div>
              <div className="w-1/4 sm:w-1/2 p-6">
                <img style={{ width: "70%" }} src={eduVideoPic} />
              </div>
            </div>
            <br />
            <div className="flex flex-wrap flex-col-reverse sm:flex-row">
              <div className="w-1/4 sm:w-1/2 p-6">
                <img style={{ width: "70%" }} src={vizDataPic} />
              </div>
              <div className="w-full sm:w-1/2 p-6 mt-6">
                <div className="align-middle">
                  <br />
                  <br />
                  <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                    Multiple Asset Data Visualization
                  </h3>
                  <p className="text-gray-600 mb-8">
                    You can visualize mulitple asset's (Stocks, Digital Currency
                    & Comodity) data, all on one platform using popular graph
                    types. We have real time series data, for better prediction
                    and visualiztion and it will keep you informed about the
                    real world scenarios.
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/2 p-6">
                <br />
                <br />
                <br />
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  ML Model for Trend Prediction
                </h3>
                <p className="text-gray-600 mb-8">
                  Machine learning model is used to make predictions about data
                  trend on old time series data, so you can compare your
                  analysis with it (and be sure) or can learn from your
                  mistakes.
                  <br />
                  <br />
                </p>
              </div>
              <div className="w-1/4 sm:w-1/2 p-6">
                <br />
                <br />
                <img style={{ width: "70%" }} src={mlPic} />
              </div>
            </div>
            <br />
            <div className="flex flex-wrap flex-col-reverse sm:flex-row">
              <div className="w-1/4 sm:w-1/2 p-6">
                <img style={{ width: "70%" }} src={corrPic} />
              </div>
              <div className="w-full sm:w-1/2 p-6 mt-6">
                <div className="align-middle">
                  <br />
                  <br />
                  <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                    Correlation Between Asset Types
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Why put all eggs in one basket? Using correlation feature
                    you can inspect if market changes of one asset type effects
                    the other. It can help you make informed investment
                    decisions.
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white border-b py-8">
          <div className="container mx-auto flex flex-wrap pt-4 pb-12">
            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Additional Features
            </h1>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <br />
                <img
                  style={{
                    width: "65%",
                    margin: "auto",
                  }}
                  src={dashboardPic}
                />
                <br />
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Dashboard
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  All your saved reports, notes and recent saved graphs are
                  available on your dashboard.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <br />
                <img
                  style={{
                    width: "70%",
                    margin: "auto",
                  }}
                  src={bookmarkPic}
                />
                <br />
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Bookmarks
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Notes and important timestamps of educational videos can be
                  saved and reviewed later.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <br />
                <img
                  style={{
                    width: "52%",
                    margin: "auto",
                  }}
                  src={reportsPic}
                />
                <br />
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Saved Notes & Reports
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Snapshot of graphs and notes can be saved as Reports. You can
                  review and make changes to these reports at another time.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="form" className="bg-gray-100 py-8">
          <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              • Contact Us •
            </h1>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div className="icon_wrapper">
              <svg className="icon" viewBox="0 0 145.192 145.192">
                <path d="M126.82,32.694c-2.804,0-5.08,2.273-5.08,5.075v2.721c-1.462,0-2.646,1.185-2.646,2.647v1.995    c0,1.585,1.286,2.873,2.874,2.873h20.577c1.462,0,2.646-1.185,2.646-2.647v-3.041c0-1.009-0.816-1.825-1.823-1.825v-2.722    c0-2.802-2.276-5.075-5.079-5.075h-1.985v-3.829c0-3.816-3.095-6.912-6.913-6.912h-0.589h-20.45c0-2.67-2.164-4.835-4.833-4.835    H56.843c-2.67,0-4.835,2.165-4.835,4.835H34.356v-3.384h-9.563v3.384v1.178h-7.061v1.416c-2.67,0.27-10.17,1.424-13.882,5.972    c-1.773,2.17-2.44,4.791-1.983,7.793c0.463,3.043,1.271,6.346,2.128,9.841c2.354,9.616,5.024,20.515,0.549,28.077    C2.647,79.44-3.125,90.589,2.201,99.547c4.123,6.935,13.701,10.44,28.5,10.44c1.186,0,2.405-0.023,3.658-0.068v9.028h-0.296    c-2.516,0-4.558,2.039-4.558,4.558v4.566h100.04v-4.564c0-2.519-2.039-4.558-4.558-4.558h-0.297V84.631h0.297    c2.519,0,4.558-2.037,4.558-4.556v-0.009c0-2.516-2.039-4.556-4.556-4.556l-36.786-0.009V61.973c0-2.193-1.777-3.971-3.972-3.971    v-4.711h0.456c1.629,0,2.952-1.32,2.952-2.949h14.227V34.459h1.658c2.672,0,4.834-2.165,4.834-4.834h20.45v3.069H126.82z     M34.06,75.511c-2.518,0-4.558,2.04-4.558,4.556v0.009c0,2.519,2.042,4.556,4.558,4.556h0.296v24.12l-0.042-1.168    c-15.994,0.574-26.122-2.523-30.106-9.229C-0.464,90.5,4.822,80.347,6.55,77.423c4.964-8.382,2.173-19.774-0.29-29.825    c-0.843-3.442-1.639-6.696-2.088-9.638c-0.354-2.35,0.129-4.3,1.484-5.958c3.029-3.714,9.509-4.805,12.076-5.1v1.233h7.061v1.49    v2.684c-2.403,1.114-4.153,2.997-4.676,5.237H18.15c-0.584,0-1.056,0.474-1.056,1.056v0.83c0,0.584,0.475,1.056,1.056,1.056h1.984    c0.561,2.18,2.304,3.999,4.658,5.092v0.029c0,0-2.282,20.823,16.479,22.099v1.102c0,1.177,0.955,2.133,2.133,2.133h3.297    c1.178,0,2.133-0.956,2.133-2.133V50.135c0-1.177-0.955-2.132-2.133-2.132h-3.297c-1.178,0-2.133,0.955-2.133,2.132    c-1.575-0.235-5.532-1.17-6.635-4.547c2.36-1.092,4.109-2.913,4.669-5.097h1.308c0.722,0,1.309-0.584,1.309-1.308v-0.578    c0-0.584-0.475-1.056-1.056-1.056h-1.539c-0.542-2.332-2.416-4.271-4.968-5.363v-2.559h17.651c0,2.67,2.166,4.835,4.836,4.835 h2.392v15.88h13.639c0,1.629,1.321,2.949,2.951,2.949h0.899v4.711c-2.194,0-3.972,1.778-3.972,3.971v13.529L34.06,75.511z     M95.188,101.78c0,8.655-7.012,15.665-15.664,15.665c-8.653,0-15.667-7.01-15.667-15.665c0-8.647,7.014-15.664,15.667-15.664    C88.177,86.116,95.188,93.132,95.188,101.78z M97.189,45.669h-9.556c0-0.896-0.726-1.62-1.619-1.62H74.494    c-0.896,0-1.621,0.727-1.621,1.62h-8.967v-11.21h33.283V45.669z" />
                <path d="M70.865,101.78c0,4.774,3.886,8.657,8.66,8.657c4.774,0,8.657-3.883,8.657-8.657c0-4.773-3.883-8.656-8.657-8.656    C74.751,93.124,70.865,97.006,70.865,101.78z" />
              </svg>
            </div>
            <div>
              <div id="container">
                <form action="#" method="post" id="contact_form">
                  <div className="name">
                    <label htmlFor="name" />
                    <input
                      type="text"
                      placeholder="My Name Is"
                      name="name"
                      id="name_input"
                      required
                    />
                  </div>
                  <div className="email">
                    <label htmlFor="email" />
                    <input
                      type="email"
                      placeholder="My Email Is"
                      name="email"
                      id="email_input"
                      required
                    />
                  </div>
                  <div className="telephone">
                    <label htmlFor="name" />
                    <input
                      type="text"
                      placeholder="My Number Is"
                      name="telephone"
                      id="telephone_input"
                      required
                    />
                  </div>

                  <div className="message">
                    <label htmlFor="message" />
                    <textarea
                      name="message"
                      placeholder="I'd Like to Chat About"
                      id="message_input"
                      cols={30}
                      rows={5}
                      required
                      defaultValue={""}
                    />
                  </div>
                  <br />
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    className="submit"
                  >
                    <input
                      style={{
                        border: "1px solid #5f5bf5",
                        padding: 6,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 15,
                        width: "20%",
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#5f5bf5",
                      }}
                      type="submit"
                      defaultValue="Send Message"
                      id="form_button"
                    />
                  </div>
                </form>
                {/* // End form */}
              </div>
            </div>
          </div>
        </section>
        {/* Change the colour #f8fafc to match the previous section colour */}
        <svg
          className="wave-top"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#f8fafc">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z" />
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path
                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                    opacity="0.100000001"
                  />
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  />
                  <path
                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                    opacity="0.200000003"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <section className="container mx-auto text-center py-6 mb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Join Now
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
          </div>
          <h3 className="my-4 text-3xl leading-tight">
            Start Your Journey Towards Becoming an Investor
          </h3>
          <Link
            style={{
              padding: 7,
              paddingRight: 30,
              paddingLeft: 30,
              fontWeight: "bold",
              borderRadius: 15,
              textAlign: "center",
              color: "black",
              backgroundColor: "#f4f4f5",
            }}
            to="register"
          >
            Sign Up !
          </Link>
        </section>
        {/*Footer*/}
        <footer className="bg-white">
          <div className="container mx-auto px-8">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1 mb-6 text-black">
                <a
                  style={{ color: "#6d69fb" }}
                  className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                  href="#"
                >
                  {/*Icon from: http://www.potlabicons.com/ */}
                  <svg
                    className="h-8 fill-current inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.005 512.005"
                  >
                    <rect
                      fill="#2a2a31"
                      x="16.539"
                      y="425.626"
                      width="479.767"
                      height="50.502"
                      transform="matrix(1,0,0,1,0,0)"
                    />
                    <path
                      className="plane-take-off"
                      d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
                    />
                  </svg>
                  FinTacTic
                </a>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-500 md:mb-6">Legal</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="#"
                      className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-500 md:mb-6">Social</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="#"
                      className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-500 md:mb-6">Company</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/land"
                      className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <a
            href="https://www.freepik.com/free-photos-vectors/background"
            className="text-gray-500"
          >
            Background vector created by freepik - www.freepik.com
          </a> */}
        </footer>
      </div>
    );
  }
}

export default Home;
