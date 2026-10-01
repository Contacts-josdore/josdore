/* ============================================================
   JOSDORE — SERVICE WORKER
   PWA : cache statique + mode hors ligne + stratégie réseau
   ============================================================
   Version : 1.0.0
   Documentation : https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API
   ============================================================ */

const VERSION = 'josdore-v1.0.0';
const CACHE_STATIQUE = `${VERSION}-static`;
const CACHE_PAGES = `${VERSION}-pages`;

/* ------------------------------------------------------------------
   Fichiers à mettre en cache dès l'installation
   ------------------------------------------------------------------ */
const FICHIERS_A_CACHER = [
  // Racine
  '/',
  'index.html',
  'a-propos.html',
  'contact.html',
  '404.html',
  '500.html',
  'recherche.html',
  'connexion.html',
  'inscription.html',

  // Manifest et favicon
  'manifest.webmanifest',
  'assets/images/logo/favicon.svg',
  'assets/images/logo/favicon-32.png',
  'assets/images/logo/favicon-180.png',

  // CSS de base (déjà créés)
  'assets/css/reset.css',
  'assets/css/global.css',

  // JS de base (déjà créé)
  'assets/js/global.js'
];

/* ------------------------------------------------------------------
   INSTALLATION — mise en cache initiale
   ------------------------------------------------------------------ */
self.addEventListener('install', (event) => {
  console.log('[JosDore SW] Installation…');
  event.waitUntil(
    caches.open(CACHE_STATIQUE)
      .then((cache) => {
        console.log('[JosDore SW] Mise en cache initiale');
        return cache.addAll(FICHIERS_A_CACHER);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[JosDore SW] Erreur installation (certains fichiers manquants) :', err);
      })
  );
});

/* ------------------------------------------------------------------
   ACTIVATION — nettoyage des anciens caches
   ------------------------------------------------------------------ */
self.addEventListener('activate', (event) => {
  console.log('[JosDore SW] Activation…');
  event.waitUntil(
    caches.keys().then((noms) => {
      return Promise.all(
        noms.map((nom) => {
          if (nom !== CACHE_STATIQUE && nom !== CACHE_PAGES) {
            console.log('[JosDore SW] Suppression ancien cache :', nom);
            return caches.delete(nom);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* ------------------------------------------------------------------
   FETCH — stratégie de cache
   ------------------------------------------------------------------
   - Navigations HTML : réseau d'abord, fallback cache puis 404
   - Assets statiques : cache d'abord, réseau en fallback
   - API / JSON : réseau uniquement (jamais en cache)
   ------------------------------------------------------------------ */
self.addEventListener('fetch', (event) => {
  const requete = event.request;
  const url = new URL(requete.url);

  // Ignore les requêtes non-GET
  if (requete.method !== 'GET') return;

  // Ignore les domaines externes (fonts.googleapis, flaticon, whatsapp...)
  if (url.origin !== self.location.origin) return;

  // Ignore les JSON (données dynamiques, toujours frais)
  if (url.pathname.endsWith('.json')) return;

  // Ignore les routes app / compte / admin (dynamiques)
  if (
    url.pathname.startsWith('app/') ||
    url.pathname.startsWith('compte/') ||
    url.pathname.startsWith('admin/')
  ) return;

  // Stratégie pour les pages HTML (navigations)
  if (requete.mode === 'navigate' || requete.destination === 'document') {
    event.respondWith(
      fetch(requete)
        .then((reponse) => {
          // Met en cache la nouvelle version
          const copie = reponse.clone();
          caches.open(CACHE_PAGES).then((cache) => cache.put(requete, copie));
          return reponse;
        })
        .catch(() => {
          // Hors ligne : on essaie le cache, sinon 404
          return caches.match(requete).then((cache) => {
            return cache || caches.match('404.html');
          });
        })
    );
    return;
  }

  // Stratégie cache-first pour les assets statiques
  event.respondWith(
    caches.match(requete).then((cache) => {
      if (cache) return cache;

      return fetch(requete).then((reponse) => {
        // Met en cache les ressources valides
        if (reponse && reponse.status === 200) {
          const copie = reponse.clone();
          caches.open(CACHE_STATIQUE).then((c) => c.put(requete, copie));
        }
        return reponse;
      }).catch(() => {
        // Rien à faire hors ligne
        return new Response('', { status: 408, statusText: 'Hors ligne' });
      });
    })
  );
});

/* ------------------------------------------------------------------
   MESSAGES — permet de forcer la mise à jour depuis la page
   ------------------------------------------------------------------ */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});