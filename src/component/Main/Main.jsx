import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim()) {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>NexusAI</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt || input}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello, Developer</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => {
                setInput("Suggest good projects for AR");
                handleSend();
              }}>
                <p>Suggest good projects for AR</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => {
                setInput("5 min craft ideas");
                handleSend();
              }}>
                <p>5 min craft ideas</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card" onClick={() => {
                setInput("Google dev fest pricing");
                handleSend();
              }}>
                <p>Google dev fest pricing</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card" onClick={() => {
                setInput("Embedded code for Google APIs font");
                handleSend();
              }}>
                <p>Embedded code for Google APIs font</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input ? (
                <img onClick={handleSend} src={assets.send_icon} alt="Send Icon" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            NexusAI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
