const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// Import des routes
const indexRouter = require('./public/routes/index');
const tasksRouter = require('./public/routes/tasks');
const tagsRouter = require('./public/routes/tags');
const authRouter = require('./public/routes/auth');

// Import des modèles
const db = require('./bin/models');

const app = express();

// Configuration du view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Injecter les modèles dans les requêtes
app.use((req, res, next) => {
  req.models = db;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/tags', tagsRouter);
app.use('/auth', authRouter); // Cette ligne manquait !

// Synchronisation de la base de données
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ Base de données prête');
});

// Gestion des erreurs 404
app.use(function(req, res, next) {
  res.status(404).render('error', { 
    title: 'Page non trouvée',
    message: 'Désolé, la page que vous cherchez n\'existe pas.' 
  });
});

// Gestion des erreurs
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Erreur serveur',
    message: 'Quelque chose s\'est mal passé!' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;