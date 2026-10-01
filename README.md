# JosDore

> **Écosystème technologique et éducatif africain.**
> 4 pôles. 10 activités. Une vision : outiller l'Afrique numérique.

[![Site](https://img.shields.io/badge/site-josdore.com-F59E0B?style=flat-square)](https://josdore.com)
[![App](https://img.shields.io/badge/app-josdore.app-2563EB?style=flat-square)](https://josdore.app)
[![Statut](https://img.shields.io/badge/statut-en%20développement-DC2626?style=flat-square)](https://josdore.com)

---

## 📖 À propos

JosDore est un écosystème africain basé à **Abomey-Calavi (Bénin)**, fondé par **Ulrich Jos Doré HOUNKPE**.

Il réunit **4 pôles** et **10 activités** :

| Pôle | Couleur | Activités |
|---|---|---|
| 🔴 **Communauté** | `#BE123C` | JosDore Réseau |
| 🔵 **Tech** | `#2563EB` | Techs, Software, Outils |
| 🟢 **Commerce** | `#16A34A` | Store, Kit, Books |
| 🟡 **Éducation** | `#CA8A04` | Academy, English, Games |

**Slogan du groupe :** « Apprendre. Travailler. Évoluer. »

---

## 🎯 Mission

> Construire l'écosystème technologique et éducatif africain de référence, en outillant les techniciens, en formant les étudiants, et en connectant les professionnels entre eux.

---

## 📁 Structure du projet
josdore/
├── index.html → Vitrine groupe
├── app/ → JosDore Réseau (app.josdore.com)
├── pages/ → Les 4 pôles
│ ├── communaute/
│ ├── tech/
│ ├── commerce/
│ └── education/
├── legal/ → Pages légales
├── compte/ → Espace utilisateur
├── support/ → Centre d'aide
├── blog/ → Blog JosDore
├── assets/
│ ├── css/
│ ├── js/
│ ├── icons/
│ ├── images/
│ ├── fonts/
│ └── data/ → Bases JSON
└── docs/ → Documentation

**Documentation complète :** voir [`docs/document-maitre.md`](docs/document-maitre.md)

---

## 🛠️ Stack technique

| Élément | Choix |
|---|---|
| **Type** | Site statique multi-pages + apps SPA |
| **Hébergement** | GitHub Pages |
| **Domaine** | `josdore.com` (CNAME) |
| **Polices** | Poppins (titres) + Inter (texte) |
| **Icônes** | Flaticon UIcons (Regular, Solid, Brands) |
| **PWA** | Oui — manifest + service worker |
| **Données** | Fichiers JSON statiques |

---

## 📜 Charte graphique

| Couleur | Code | Usage |
|---|---|---|
| Bleu nuit | `#0A2540` | Couleur principale |
| Bleu tech | `#2563EB` | Accents, liens |
| Or | `#F59E0B` | Signature JosDore |
| Or foncé | `#D97706` | Hover, prix |

**Détails complets :** voir [`docs/charte-graphique.md`](docs/charte-graphique.md)

---

## 🚀 Développement local

Le projet est **100% statique**. Aucun build nécessaire.

```bash
# Cloner
git clone https://github.com/[ton-user]/josdore.git
cd josdore

# Servir en local (Python 3)
python3 -m http.server 8000
# ou (Node.js)
npx serve

# Ouvrir
open http://localhost:8000
🌐 Déploiement
Le déploiement est automatique via GitHub Pages + GitHub Actions.

Chaque git push sur main déclenche le workflow .github/workflows/deploy.yml.

Sous-domaines prévus :

Sous-domaine	Dossier
josdore.com	/
app.josdore.com	/app/
tech.josdore.com	/pages/tech/
store.josdore.com	/pages/commerce/store/
academy.josdore.com	/pages/education/academy/
english.josdore.com	/pages/education/english/
games.josdore.com	/pages/education/games/
outils.josdore.com	/pages/tech/outils/
📞 Contact
Canal	Coordonnées
Site	josdore.com
Email	contact@josdore.app
WhatsApp	+229 01 28 62 14 07
Siège	Abomey-Calavi, Bénin
📄 Licence
Voir le fichier LICENSE.

Fait avec ❤️ à Abomey-Calavi, Bénin.
