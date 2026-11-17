/* API de démonstration : remplace la base de données. Tout reste dans ce navigateur (localStorage).
   Mêmes règles que la vraie version : créneaux alignés, horaires, pas de double réservation par barbier. */
(function () {
  'use strict';
  var C = window.SITE_CONFIG, KEY = 'demo-rdv-' + C.SITE_ID, OFF = C.TZ_OFFSET_MIN * 60000;
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(x) { localStorage.setItem(KEY, JSON.stringify(x)); }
  function ok(d) { return Promise.resolve({ data: d, error: null }); }
  function ko(m) { return Promise.resolve({ data: null, error: { message: m } }); }
  function active(a) { return a.status !== 'cancelled'; }
  var api = {
    rpc: function (name, p) {
      p = p || {};
      if (name === 'cutbarber_public_info') return ok({ barbers: C.BARBERS, services: C.SERVICES, hours: C.HOURS });
      if (name === 'cutbarber_busy') {
        var f = Date.parse(p.p_from), t = Date.parse(p.p_to);
        return ok(load().filter(function (a) { return active(a) && Date.parse(a.starts_at) < t && Date.parse(a.ends_at) > f; })
          .map(function (a) { return { barber_id: a.barber_id, starts_at: a.starts_at, ends_at: a.ends_at }; }));
      }
      if (name === 'cutbarber_book') {
        var name_ = (p.p_name || '').trim(), ph = (p.p_phone || '').trim();
        if (name_.length < 2) return ko('bad_name');
        if (!/^\+?[0-9 .-]{8,20}$/.test(ph)) return ko('bad_phone');
        var s = C.SERVICES.filter(function (x) { return x.id === p.p_service_id; })[0]; if (!s) return ko('bad_service');
        var st = Date.parse(p.p_starts_at), now = Date.now();
        if (st < now + 15 * 60000 || st > now + 60 * 86400000) return ko('bad_time');
        var L = new Date(st + OFF), m = L.getUTCHours() * 60 + L.getUTCMinutes();
        var h = C.HOURS.filter(function (x) { return x.dow === L.getUTCDay(); })[0];
        if (!h || h.closed || m < h.open_min || m + s.duration_min > h.close_min) return ko('closed');
        if ((m - h.open_min) % C.STEP_MIN) return ko('bad_time');
        var en = st + s.duration_min * 60000, all = load();
        if (all.filter(function (a) { return a.client_phone === ph && active(a) && Date.parse(a.starts_at) > now; }).length >= 3) return ko('too_many');
        var cands = C.BARBERS.filter(function (b) { return p.p_barber_id == null || b.id === p.p_barber_id; });
        var b = cands.filter(function (b) { return !all.some(function (a) { return active(a) && a.barber_id === b.id && Date.parse(a.starts_at) < en && Date.parse(a.ends_at) > st; }); })[0];
        if (!b) return ko('slot_taken');
        var rec = { id: String(now) + Math.random().toString(36).slice(2, 7), barber_id: b.id, service: s.name, starts_at: new Date(st).toISOString(), ends_at: new Date(en).toISOString(), client_name: name_, client_phone: ph, status: 'booked' };
        all.push(rec); save(all);
        return ok({ id: rec.id, barber_id: b.id, barber_name: b.name, service: s.name, starts_at: rec.starts_at, ends_at: rec.ends_at });
      }
      return ko('unknown');
    },
    list: load,
    reset: function () { localStorage.removeItem(KEY); }
  };
  window.DEMO_API = api;
})();
