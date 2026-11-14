# Audit et maintenance du comparatif

Mise à jour : 14 novembre 2026. Comparatif personnel de neuf aspirateurs balais à sec.

## Architecture

- `aspirateurs.json` : **source de référence** pour les quatre données essentielles, prix, statut commercial, poids (corps seul / prêt à aspirer), Air Watts et conditions, autonomies par mode, preuves et avantages/inconvénients.
- `index.html` : charge ce JSON et affiche neuf cartes, les filtres, le tri, les repères par usage et le comparateur. Aucun prix n'est codé en dur dans le rendu des cartes ou des tableaux.
- `fiche-data.js` : relit le même JSON pour synchroniser les quatre indicateurs principaux des neuf fiches détaillées et ajouter un lien marchand daté.
- Neuf fichiers `.html` : analyses rédactionnelles et sources originales. **Le corps de ces analyses demeure éditorial et daté** ; toute actualisation substantielle doit donc aussi vérifier les paragraphes narratifs.

## Règles de fiabilité

1. N'utiliser une valeur d'autonomie comme **mesurée** que si elle provient d'un essai indépendant ; distinguer **observé**, **extrapolé**, **annoncé**, **inconnu**.
2. Ne jamais comparer directement un poids de bloc seul avec un poids de l'appareil complet et sa brosse. Afficher « Non vérifié » lorsque le poids complet manque.
3. Préciser le mode, la tête d'aspiration et les conditions lorsqu'elles sont connues. Ne pas déduire les Air Watts intermédiaires du seul maximum fabricant.
4. Un prix est daté et lié à un distributeur, une variante, une disponibilité. Une rupture de stock et une précommande ne sont pas des offres immédiatement achetables.
5. Les résultats de laboratoires différents ne sont pas convertibles en note unique sans protocole comparable. Les « pistes pour choisir » sont des repères éditoriaux, non un palmarès scientifique.
6. Si une variante étrangère ou un pack d'accessoires diffère, le préciser ; ne pas reporter aveuglément les résultats.

## Corrections validées

- **Rowenta X-Force Flex 14.80 RH9B74WO** : prix officiel neuf corrigé de 399,99 € à **499,99 €** (Rowenta France ; Boulanger : 499 € au relevé). Les trois emplacements du texte éditorial concerné ont été corrigés.
- **Roborock H60 Ultra** : 158 € ponctuels, prix Roborock France confirmé, à revalider pour la disponibilité. Poids complet avec brosse inconnu.
- **Rowenta X-Force Flex 16.60** : 469,99 € Fnac mais livraison différée indiquée au 27 novembre 2026 ; résultats indépendants par surface insuffisants ; incohérence dans la notice concernant l'autonomie Boost.
- **Tineco A90S** : 439,99 € sur Tineco France **en rupture** lors du relevé.
- **Samsung Jet Lite** : les Air Watts publiés par mode restent des déclarations constructeur ; les autonomies testées sont identifiées séparément.
- Autres modèles : disponibilité non affirmée lorsqu'elle n'a pas été confirmée.

## Améliorations ergonomiques

- Une carte par ligne sur smartphone (jusqu'à 570 px), deux sur tablette, trois sur ordinateur.
- Taille minimale et contrastes revus pour les notes, sous-titres et chiffres du tableau.
- Tableau horizontal avec colonne « Critère » fixe, largeur augmentée suivant le nombre de modèles, accès clavier.
- Comparaison de poids prêt à aspirer et de poids à main sur **deux lignes séparées**.
- Tri facultatif par prix de relevé (uniquement indicatif) et repères par besoin (budget, polyvalence, station de vidage).
- Les liens vers les fiches conservent la sélection effectuée.

## Points à confirmer avant achat

- Prix et **disponibilité du jour** pour tous les modèles ; les promotions changent.
- Poids complet avec électrobrosse : Dreame V30, Roborock H60 Ultra, Rowenta Silence 20.80.
- Mesures indépendantes détaillées de la référence française Rowenta 16.60.
- Durées précises par mode et tête du Rowenta 20.80.
- Référence, disponibilité et coût de batterie pour Tineco A90S et Rowenta 20.80.
- Contradictions des notices Samsung Jet Lite et Rowenta 16.60 concernant certains modes.
- Les tests internes de logique JavaScript ne remplacent pas un contrôle visuel **dans un vrai navigateur sur GitHub Pages**.

## Mise à jour

1. Éditer le bon modèle dans `aspirateurs.json` (en gardant le même `id` et le bon `page`).
2. Mettre à jour `price.amount`, `merchant`, `status`, `date` et `url` ensemble.
3. Recontrôler les analyses rédactionnelles dans la fiche détaillée, en particulier ses paragraphes de prix et ses comparaisons historiques.
4. Tester la recherche, le tri, la sélection, les liens, le tableau et l'affichage mobile après publication.

Aucun score numérique global n'est établi, en raison des différents protocoles de test et des données manquantes.

## Relevé de prix multi-enseignes du 14 novembre 2026

- L’accueil et les neuf fiches affichent cinq canaux : fabricant, Amazon, Boulanger, Fnac, Darty, soit 45 positions.
- 27 offres ont un prix directement constaté sur une page marchande ; deux prix Amazon proviennent de comparateurs tiers datés et **ne sont pas des offres vérifiées chez Amazon** ; 16 autres positions sont « Non vérifié ».
- Chaque offre comprend un prix TTC relevé, éventuellement un prix barré de la **même enseigne**, la remise calculée, la disponibilité indiquée et un lien vers la source. Une recherche Amazon sans prix confirmé renvoie vers les résultats de recherche et est étiquetée comme telle.
- Un prix barré n’est pas nécessairement un prix récemment pratiqué : ne pas interpréter les réductions comme une économie garantie. Les codes promotionnels et frais de livraison ne sont pas inclus.
- Le prix principal de la carte est celui d’une offre directement constatée hors rupture lorsqu’il en existe ; exception : Tineco A90S, dont le prix fabricant en rupture est affiché avec un avertissement explicite.
- Le site n’effectue pas de suivi en temps réel des tarifs. Réactualiser les données et les pages détaillées avant l’achat.
