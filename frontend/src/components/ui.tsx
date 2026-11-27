import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import './ui.css'

type ButtonVariant = 'primary' | 'secondary' | 'attention'

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={`btn btn--${variant} ${className}`} {...props} />
}

export function TextField({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        className="field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="field__error">{error}</span>}
    </div>
  )
}

export type Light = 'running' | 'attention' | 'fault' | 'off'

/** Color is never the only signal: the label is always rendered. */
export function StatusLight({ light, label }: { light: Light; label: string }) {
  return (
    <span className="status-light">
      <span className={`status-light__dot status-light__dot--${light}`} aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}

export function Tag({
  children,
  tone = 'outline',
}: {
  children: ReactNode
  tone?: 'outline' | 'critical' | 'attention' | 'solid'
}) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

export function Nameplate({
  serial,
  title,
  meta,
  children,
}: {
  serial: string
  title: string
  meta?: string
  children?: ReactNode
}) {
  return (
    <section className="nameplate" aria-label={`Asset ${title}`}>
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <span key={corner} className={`nameplate__rivet nameplate__rivet--${corner}`} aria-hidden="true" />
      ))}
      <div className="nameplate__serial">SN {serial}</div>
      <h2 className="nameplate__title">{title}</h2>
      {meta && <div className="nameplate__meta">{meta}</div>}
      {children}
    </section>
  )
}

/** Only for safety messages. */
export function HazardBanner({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="hazard" role="alert">
      <div className="hazard__stripe" aria-hidden="true" />
      <div className="hazard__body">
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  )
}
