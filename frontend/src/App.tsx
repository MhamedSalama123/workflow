import { useState } from 'react'
import { Button, HazardBanner, Nameplate, StatusLight, Tag, TextField } from './components/ui'
import './App.css'

/** Phase 0 component sheet. Every Phase 1 screen is built only from these parts. */
export default function App() {
  const [dark, setDark] = useState(false)

  return (
    <div data-theme={dark ? 'dark' : 'light'} className="page">
      <header className="topbar">
        <span className="topbar__logo" aria-hidden="true" />
        <span className="topbar__name">WorkFlow</span>
      </header>

      <main className="sheet">
        <div className="sheet__head">
          <div>
            <div className="label">Phase 0 · Design system</div>
            <h1>Component sheet</h1>
          </div>
          <Button variant="secondary" onClick={() => setDark(!dark)}>
            {dark ? 'Light mode' : 'Control room mode'}
          </Button>
        </div>

        <section className="panel">
          <h2>Buttons</h2>
          <div className="row">
            <Button>Mark as resolved</Button>
            <Button variant="secondary">Log time</Button>
            <Button variant="attention">Replace</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="panel">
          <h2>Inputs</h2>
          <div className="grid">
            <TextField label="Ticket title" placeholder="Pressure drops under load" />
            <TextField label="Asset" defaultValue="CMP" error="No asset with code CMP" />
          </div>
        </section>

        <section className="panel">
          <h2>Status lights and tags</h2>
          <div className="row">
            <StatusLight light="running" label="Running" />
            <StatusLight light="attention" label="Waiting for parts" />
            <StatusLight light="fault" label="Machine down" />
            <StatusLight light="off" label="Retired" />
          </div>
          <div className="row">
            <Tag tone="critical">Critical</Tag>
            <Tag>High</Tag>
            <Tag>Medium</Tag>
            <Tag>Low</Tag>
            <Tag tone="attention">Overdue 3 h</Tag>
            <Tag tone="solid">Approved</Tag>
          </div>
        </section>

        <section className="panel">
          <h2>Nameplate</h2>
          <Nameplate serial="4471-CMP-03" title="Compressor CMP-03" meta="Hall B · Bay 4 · installed 2017">
            <div className="row">
              <StatusLight light="attention" label="Running, review open" />
            </div>
          </Nameplate>
        </section>

        <section className="panel">
          <h2>Hazard banner</h2>
          <HazardBanner title="Safety: technician only">
            <p className="hazard-text">
              I can't give repair steps for machines under pressure or with moving parts. Please keep a safe
              distance and let a technician check it.
            </p>
            <Button>Report CMP-03 to a technician</Button>
          </HazardBanner>
        </section>
      </main>
    </div>
  )
}
