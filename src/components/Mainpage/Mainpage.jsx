import React, { useContext } from 'react'
import './Mainpage.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Mainpage = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  return (
    <div className="main">
      <div className="nav">
        <p>InfiChat</p>
        <img src={assets.users_icon} alt="User profile" />
      </div>

      <div className="main-container">
        {/* Scrollable area — greet+cards OR result */}
        <div className="main-content-area">
          {!showResult ? (
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>

              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>Newest innovations in floating platforms for hybrid wind and solar energy</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>Improve the readability of my code</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.users_icon} alt="You" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="InfiChat" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sticky input bar */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ask InfiChat"
            />
            <div>
              <img src={assets.gallery_icon} alt="Attach image" />
              <img src={assets.mic_icon} alt="Voice input" />
              {input && (
                <img onClick={() => onSent()} src={assets.send_icon} alt="Send" />
              )}
            </div>
          </div>
          <p className="bottom-info">InfiChat may display inaccurate info, so double-check it</p>
        </div>
      </div>
    </div>
  )
}

export default Mainpage
