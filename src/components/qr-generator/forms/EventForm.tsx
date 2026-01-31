'use client'

import type { EventData } from '@/types/qr'

interface EventFormProps {
  data: EventData
  onChange: (data: EventData) => void
}

export function EventForm({ data, onChange }: EventFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="event-title" className="block text-sm font-medium text-slate-700 mb-2">
          Veranstaltung
        </label>
        <input
          type="text"
          id="event-title"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Team Meeting"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="event-location" className="block text-sm font-medium text-slate-700 mb-2">
          Ort (optional)
        </label>
        <input
          type="text"
          id="event-location"
          value={data.location}
          onChange={(e) => onChange({ ...data, location: e.target.value })}
          placeholder="Konferenzraum A"
          className="input-field"
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="event-allday"
          checked={data.allDay}
          onChange={(e) => onChange({ ...data, allDay: e.target.checked })}
          className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
        />
        <label htmlFor="event-allday" className="text-sm font-medium text-slate-700">
          Ganztägig
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="event-start-date" className="block text-sm font-medium text-slate-700 mb-2">
            Startdatum
          </label>
          <input
            type="date"
            id="event-start-date"
            value={data.startDate}
            onChange={(e) => onChange({ ...data, startDate: e.target.value })}
            className="input-field"
          />
        </div>

        {!data.allDay && (
          <div>
            <label htmlFor="event-start-time" className="block text-sm font-medium text-slate-700 mb-2">
              Startzeit
            </label>
            <input
              type="time"
              id="event-start-time"
              value={data.startTime}
              onChange={(e) => onChange({ ...data, startTime: e.target.value })}
              className="input-field"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="event-end-date" className="block text-sm font-medium text-slate-700 mb-2">
            Enddatum
          </label>
          <input
            type="date"
            id="event-end-date"
            value={data.endDate}
            onChange={(e) => onChange({ ...data, endDate: e.target.value })}
            className="input-field"
          />
        </div>

        {!data.allDay && (
          <div>
            <label htmlFor="event-end-time" className="block text-sm font-medium text-slate-700 mb-2">
              Endzeit
            </label>
            <input
              type="time"
              id="event-end-time"
              value={data.endTime}
              onChange={(e) => onChange({ ...data, endTime: e.target.value })}
              className="input-field"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="event-desc" className="block text-sm font-medium text-slate-700 mb-2">
          Beschreibung (optional)
        </label>
        <textarea
          id="event-desc"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Weitere Details zum Event..."
          className="input-field min-h-[80px] resize-y"
        />
      </div>
    </div>
  )
}
