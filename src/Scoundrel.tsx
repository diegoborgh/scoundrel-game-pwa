import { useEffect } from 'react'
import { bootScoundrel } from './scoundrel-game.js'
import './scoundrel.css'

export default function Scoundrel() {
  useEffect(() => {
    bootScoundrel()
  }, [])

  return (
    <>
      {/* ===== START SCREEN ===== */}
      <div id="start-screen" className="screen active">
        <div className="start-content">
          <h1 className="game-title">Scoundrel</h1>
          <p className="game-subtitle">A Solo Dungeon Crawl</p>
          <div className="start-card-fan" aria-hidden="true">
            <div className="fan-card fan-1"></div>
            <div className="fan-card fan-2"></div>
            <div className="fan-card fan-3"></div>
          </div>
          <button id="start-btn" className="btn btn-primary">Enter the Dungeon</button>
          <div className="rules-toggle">
            <button id="rules-btn" className="btn btn-secondary">How to Play</button>
          </div>
        </div>
      </div>

      {/* ===== RULES MODAL ===== */}
      <div id="rules-modal" className="modal" role="dialog" aria-labelledby="rules-title" aria-hidden="true">
        <div className="modal-backdrop"></div>
        <div className="modal-content">
          <h2 id="rules-title">How to Play</h2>
          <div className="rules-body">
            <section>
              <h3>Goal</h3>
              <p>Survive the dungeon by clearing all 44 cards. Your score equals your remaining HP.</p>
            </section>
            <section>
              <h3>Card Types</h3>
              <ul>
                <li><strong>Monsters</strong> (<span className="suit-club">&clubs;</span> <span className="suit-spade">&spades;</span>) — Deal damage. Strength = face value (J=11, Q=12, K=13, A=14).</li>
                <li><strong>Weapons</strong> (<span className="suit-diamond">&diams;</span> 2-10) — Equip to reduce monster damage. Replaces current weapon.</li>
                <li><strong>Potions</strong> (<span className="suit-heart">&hearts;</span> 2-10) — Heal HP (max 20). Only 1 potion heals per room.</li>
              </ul>
            </section>
            <section>
              <h3>Each Turn</h3>
              <ol>
                <li>4 cards are drawn into a <em>Room</em>.</li>
                <li><strong>Avoid:</strong> Put all 4 cards on the bottom of the deck. Cannot avoid twice in a row.</li>
                <li><strong>Face:</strong> Resolve 3 of 4 cards in any order. The 4th card stays for the next room.</li>
              </ol>
            </section>
            <section>
              <h3>Combat</h3>
              <p>Without a weapon, you take full damage. With a weapon, damage = monster value - weapon value (min 0).
                A weapon can only fight monsters with value &le; the last monster it defeated (no limit if unused).</p>
            </section>
          </div>
          <button id="rules-close" className="btn btn-primary">Got It</button>
        </div>
      </div>

      {/* ===== GAME SCREEN ===== */}
      <div id="game-screen" className="screen">

        <header id="status-bar">
          <div className="status-left">
            <div id="hp-display" className="status-item" aria-label="Health Points">
              <div className="hp-vial">
                <div id="hp-fill" className="hp-fill" style={{ height: '100%' }}></div>
                <span id="hp-text" className="hp-text">20</span>
              </div>
              <span className="status-label">HP</span>
            </div>
          </div>
          <div className="status-center">
            <div id="weapon-display" className="status-item weapon-info">
              <span className="status-label">Weapon</span>
              <div id="weapon-detail" className="weapon-detail">None</div>
              <div id="weapon-constraint" className="weapon-constraint"></div>
            </div>
          </div>
          <div className="status-right">
            <div id="deck-display" className="status-item" aria-label="Cards remaining in dungeon">
              <div className="deck-icon" aria-hidden="true">
                <img src="/assets/deck.webp" alt="" className="deck-thumb" />
                <span id="deck-count" className="deck-count">44</span>
              </div>
              <span className="status-label">Dungeon</span>
            </div>
            <button id="mute-btn" className="mute-btn" aria-label="Toggle sound" title="Toggle sound">
              <span className="mute-icon" aria-hidden="true">&#9835;</span>
            </button>
            <button id="help-btn" className="mute-btn" aria-label="How to play" title="How to play">
              <span aria-hidden="true">?</span>
            </button>
          </div>
        </header>

        <main id="room-area">
          <div id="room-prompt" className="room-prompt" aria-live="polite">Draw a room to begin...</div>
          <div id="room-cards" className="room-cards" role="list" aria-label="Room cards">
            {/* Cards injected by JS */}
          </div>
          <div id="action-area">
            <button id="avoid-btn" className="btn btn-secondary" disabled aria-label="Avoid this room">
              Avoid Room
            </button>
          </div>
        </main>

        <footer id="discard-area">
          <span className="discard-label">Discard</span>
          <div id="discard-pile" className="discard-pile" aria-label="Recently discarded cards"></div>
        </footer>
      </div>

      {/* ===== GAME OVER OVERLAY ===== */}
      <div id="gameover-overlay" className="screen overlay" role="dialog" aria-labelledby="gameover-title" aria-hidden="true">
        <canvas id="confetti-canvas" aria-hidden="true"></canvas>
        <div className="overlay-content">
          <h2 id="gameover-title" className="gameover-title">Defeat</h2>
          <p id="gameover-message" className="gameover-message"></p>
          <p className="gameover-score">Score: <span id="gameover-score">0</span></p>
          <button id="restart-btn" className="btn btn-primary">Descend Again</button>
        </div>
      </div>
    </>
  )
}
