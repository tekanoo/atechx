# 🔒 SÉCURITÉ - AtechX

## ⚠️ INFORMATIONS IMPORTANTES

### Configuration Firebase
- Les clés Firebase dans `firebase-config.js` sont **publiques par design**
- Firebase sécurise les applications via les **règles de sécurité** côté serveur
- Ces clés sont destinées à être exposées dans les applications web

### Fichiers sensibles exclus du repository
- `.firebaserc` (ID de projet)
- `firebase.json` (configuration de déploiement)
- `.firebase/` (cache de déploiement)
- Variables d'environnement (`.env*`)

### Bonnes pratiques appliquées
✅ Configuration Firebase séparée dans un fichier dédié
✅ `.gitignore` renforcé pour exclure les fichiers sensibles
✅ Documentation de sécurité
✅ Pas de clés privées exposées

### Pour les collaborateurs
1. Demander l'accès au projet Firebase : `atechx-b635f`
2. Installer Firebase CLI : `npm install -g firebase-tools`
3. Se connecter : `firebase login`
4. Lier le projet : `firebase use atechx-b635f`

## 🚀 Déploiement
```bash
firebase deploy
```

## 📞 Contact
Pour l'accès aux configurations sensibles, contacter l'administrateur du projet.
